# Game Developement Concordia Website
Welcome to the Game Developement Concordia website!

This repository contains source code for the CGD website. 
It is built using TypeScript and maintained by the Tech team of CGD.

Live site: https://www.concordiagamedev.ca/

## Initial Setup
Make sure you have node.js installed on your machine beforehand.

1. Clone the repository to your local machine
2. Open terminal in root folder of the project
3. Install dependencies by running:
    ```sh
    npm install
    ```

## Development

To start the local developement server, from your terminal, run:

```sh
npm run dev
```
The terminal will provide local URL where you can make changes to the website locally.

## Contribution
When contributing to the website:
- **Create a Branch**: Always create a branch for your changes named after the issue you are working on.
- **Test your changes**: Make and test your changes locally before submitting them.
- **Commit and Push**: Commit and push your changes.
- **Open a Pull Request**: Open a pull request, you will need at least one review before merging to main.
- **When reviewing someone's code**, make sure to properly review both the code itself and its deployement. Check that the changes work as expected and the rest of the website has not been affected.

Please keep code consistent with existing project conventions, when working with components, styling, file organization.

## Deployment
This repository is connected to Vercel for automatic deployement.

**Production**: Changes merged onto main will trigger a production deployement on vercel, it will update the live website in 30 seconds or so.

## Project structure
Project structure is currently undergoing improvements. Some directories and naming conventions may be inconsistent as a result of previous developement.
Improving the project structure is a high priority.



