
import os
import requests
from dotenv import load_dotenv
from notion_client import Client
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

# -----------------------------------
# 1. Configuration
# -----------------------------------

NOTION_TOKEN = os.environ["NOTION_TOKEN"]
DATA_SOURCE_ID = os.environ["NOTION_DATA_SOURCE_ID"]

GITHUB_OWNER = os.environ["GITHUB_OWNER"]
GITHUB_REPO = os.environ["GITHUB_REPO"]
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

notion = Client(auth=NOTION_TOKEN)

github_headers = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
}

if GITHUB_TOKEN:
    github_headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"


# -----------------------------------
# 2. Retrieve GitHub issues
# -----------------------------------

def get_github_issues():
    issues = []
    page = 1

    url = (
        f"https://api.github.com/repos/"
        f"{GITHUB_OWNER}/{GITHUB_REPO}/issues"
    )

    while True:
        response = requests.get(
            url,
            headers=github_headers,
            params={
                "state": "all",
                "per_page": 100,
                "page": page
            },
            timeout=30
        )

        response.raise_for_status()
        batch = response.json()

        if not batch:
            break

        # GitHub's issues endpoint also returns PRs
        for issue in batch:
            if "pull_request" not in issue:
                issues.append(issue)

        page += 1

    return issues


# -----------------------------------
# 3. Retrieve existing Notion tasks
# -----------------------------------

def get_notion_tasks():
    tasks = {}
    cursor = None

    while True:
        params = {
            "data_source_id": DATA_SOURCE_ID,
            "page_size": 100
        }

        if cursor:
            params["start_cursor"] = cursor

        response = notion.data_sources.query(**params)

        for task in response["results"]:
            url = task["properties"]["URL"]["url"]

            if url:
                tasks[url] = task

        if not response["has_more"]:
            break

        cursor = response["next_cursor"]

    return tasks


# -----------------------------------
# 4. Format GitHub issue properties
# -----------------------------------

def get_issue_properties(issue, existing_task=None):
    title = issue["title"][:2000]
    issue_url = issue["html_url"]
    number = issue["number"]

    assignees = ", ".join(
        user["login"] for user in issue["assignees"]
    )[:2000]

    # Preserve In progress for open issues
    if issue["state"] == "closed":
        status = "Done"
    else:
        status = "Not started"

        if existing_task:
            current_status = (
                existing_task["properties"]["Status"]["status"]
                or {}
            ).get("name")

            if current_status == "In progress":
                status = "In progress"

    properties = {
        "Name": {
            "title": [
                {
                    "text": {
                        "content": title
                    }
                }
            ]
        },
        "Status": {
            "status": {
                "name": status
            }
        },
        "Issue Number": {
            "number": number
        },
        "URL": {
            "url": issue_url
        },
        "Assignee": {
            "rich_text": [
                {
                    "text": {
                        "content": assignees
                    }
                }
            ] if assignees else []
        }
    }

    return properties


# -----------------------------------
# 5. Compare existing task with issue
# -----------------------------------

def task_has_changed(task, properties):
    current = task["properties"]

    current_title = "".join(
        text["plain_text"]
        for text in current["Name"]["title"]
    )

    current_assignee = "".join(
        text["plain_text"]
        for text in current["Assignee"]["rich_text"]
    )

    current_status = (
        current["Status"]["status"] or {}
    ).get("name")

    new_title = properties["Name"]["title"][0]["text"]["content"]

    new_assignee = "".join(
        text["text"]["content"]
        for text in properties["Assignee"]["rich_text"]
    )

    new_status = properties["Status"]["status"]["name"]
    new_number = properties["Issue Number"]["number"]
    new_url = properties["URL"]["url"]

    return (
        current_title != new_title
        or current_assignee != new_assignee
        or current_status != new_status
        or current["Issue Number"]["number"] != new_number
        or current["URL"]["url"] != new_url
    )


# -----------------------------------
# 6. Synchronize issues
# -----------------------------------

def sync_issues():
    print("Starting GitHub to Notion sync...")

    issues = get_github_issues()
    notion_tasks = get_notion_tasks()

    print(f"GitHub issues found: {len(issues)}")
    print(f"Notion tasks found: {len(notion_tasks)}")

    created = 0
    updated = 0
    unchanged = 0

    for issue in issues:
        issue_url = issue["html_url"]
        issue_number = issue["number"]

        existing_task = notion_tasks.get(issue_url)

        properties = get_issue_properties(
            issue,
            existing_task
        )

        if existing_task:
            if task_has_changed(existing_task, properties):
                notion.pages.update(
                    page_id=existing_task["id"],
                    properties=properties
                )

                print(f"Updated issue #{issue_number}")
                updated += 1
            else:
                print(f"Unchanged issue #{issue_number}")
                unchanged += 1

        else:
            new_task = notion.pages.create(
                parent={
                    "type": "data_source_id",
                    "data_source_id": DATA_SOURCE_ID
                },
                properties=properties
            )

            notion_tasks[issue_url] = new_task

            print(f"Created issue #{issue_number}")
            created += 1

    print("\nSync completed!")
    print(f"Created: {created}")
    print(f"Updated: {updated}")
    print(f"Unchanged: {unchanged}")


# -----------------------------------
# 7. Run
# -----------------------------------

if __name__ == "__main__":
    sync_issues()
