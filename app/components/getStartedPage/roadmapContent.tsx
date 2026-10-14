import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "@remix-run/react";
import {
  COURSE_CATEGORIES,
  type CourseCategory,
  type CourseTrack,
  type FilterCategory,
  TRACKS,
} from "./courseData";
import {
  type RoadmapStageId,
  roadmapStagesByTrack,
} from "./roadmapData";
import "./roadmap.css";

type RoadmapContentProps = {
  initialCategory?: FilterCategory;
  initialTrack?: CourseTrack | null;
  showBackLink?: boolean;
};

const categoryOptions: FilterCategory[] = ["All", ...COURSE_CATEGORIES];

const isValidTrack = (value: string | null): value is CourseTrack =>
  value !== null && TRACKS.includes(value as CourseTrack);

const isValidCategory = (value: string | null): value is FilterCategory =>
  value !== null && categoryOptions.includes(value as FilterCategory);

export default function RoadmapContent({
  initialCategory = "All",
  initialTrack = "Programming",
  showBackLink = false,
}: RoadmapContentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const trackFromUrl = searchParams.get("track");
  const categoryFromUrl = searchParams.get("category");
  const stageFromUrl = searchParams.get("stage");
  const resolvedInitialTrack = isValidTrack(trackFromUrl)
    ? trackFromUrl
    : initialTrack ?? "Programming";
  const resolvedInitialCategory = isValidCategory(categoryFromUrl)
    ? categoryFromUrl
    : initialCategory;
  const [activeTrack, setActiveTrack] =
    useState<CourseTrack>(resolvedInitialTrack);
  const [activeCategory, setActiveCategory] =
    useState<FilterCategory>(resolvedInitialCategory);
  const [activeStageId, setActiveStageId] = useState<RoadmapStageId>(
    roadmapStagesByTrack[resolvedInitialTrack].some(
      (stage) => stage.id === stageFromUrl
    )
      ? (stageFromUrl as RoadmapStageId)
      : roadmapStagesByTrack[resolvedInitialTrack][0].id
  );
  const stageRefs = useRef<Partial<Record<RoadmapStageId, HTMLElement | null>>>(
    {}
  );

  const visibleStages = useMemo(() => {
    return roadmapStagesByTrack[activeTrack].map((stage) => ({
      ...stage,
      items: stage.items.filter((item) => {
        if (activeCategory === "All") {
          return true;
        }

        return item.formats.includes(activeCategory as CourseCategory);
      }),
    }));
  }, [activeCategory, activeTrack]);

  const activeStageIndex = Math.max(
    visibleStages.findIndex((stage) => stage.id === activeStageId),
    0
  );
  const activeStage = visibleStages[activeStageIndex];
  const previousStage =
    activeStageIndex > 0 ? visibleStages[activeStageIndex - 1] : null;
  const nextStage =
    activeStageIndex < visibleStages.length - 1
      ? visibleStages[activeStageIndex + 1]
      : null;
  const progressPercentage =
    visibleStages.length > 1
      ? (activeStageIndex / (visibleStages.length - 1)) * 100
      : 0;

  const syncSearch = (
    nextTrack: CourseTrack,
    nextCategory: FilterCategory,
    nextStage: RoadmapStageId
  ) => {
    const nextParams = new URLSearchParams();

    if (nextTrack !== "Programming") {
      nextParams.set("track", nextTrack);
    }

    if (nextCategory !== "All") {
      nextParams.set("category", nextCategory);
    }

    nextParams.set("stage", nextStage);
    setSearchParams(nextParams, { replace: true });
  };

  const focusStage = (stageId: RoadmapStageId) => {
    const stageElement = stageRefs.current[stageId];

    if (!stageElement) {
      return;
    }

    stageElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
    stageElement.focus({ preventScroll: true });
  };

  const handleTrackChange = (track: CourseTrack) => {
    const firstStageId = roadmapStagesByTrack[track][0].id;
    setActiveTrack(track);
    setActiveStageId(firstStageId);
    syncSearch(track, activeCategory, firstStageId);
  };

  const handleCategoryChange = (category: FilterCategory) => {
    setActiveCategory(category);
    syncSearch(activeTrack, category, activeStageId);
  };

  const handleStageSelect = (stageId: RoadmapStageId) => {
    setActiveStageId(stageId);
    syncSearch(activeTrack, activeCategory, stageId);
    focusStage(stageId);
  };

  useEffect(() => {
    if (activeStage !== undefined) {
      syncSearch(activeTrack, activeCategory, activeStage.id);
    }
  }, []);

  useEffect(() => {
    if (isValidTrack(trackFromUrl) && trackFromUrl !== activeTrack) {
      setActiveTrack(trackFromUrl);
    }

    if (isValidCategory(categoryFromUrl) && categoryFromUrl !== activeCategory) {
      setActiveCategory(categoryFromUrl);
    }

    if (
      stageFromUrl !== null &&
      visibleStages.some((stage) => stage.id === stageFromUrl) &&
      stageFromUrl !== activeStageId
    ) {
      setActiveStageId(stageFromUrl as RoadmapStageId);
    }
  }, [
    activeCategory,
    activeStageId,
    activeTrack,
    categoryFromUrl,
    stageFromUrl,
    trackFromUrl,
    visibleStages,
  ]);

  useEffect(() => {
    if (!visibleStages.some((stage) => stage.id === activeStageId)) {
      const fallbackStageId = visibleStages[0].id;
      setActiveStageId(fallbackStageId);
      syncSearch(activeTrack, activeCategory, fallbackStageId);
    }
  }, [activeCategory, activeStageId, activeTrack, visibleStages]);

  return (
    <main className="roadmap-page">
      <div className="roadmap-shell">
        {showBackLink ? (
          <div className="roadmap-topbar">
            <Link className="roadmap-back-link" to="/getStartedPage">
              Back to Get Started
            </Link>
          </div>
        ) : null}

        <header className="roadmap-heading-card">
          <div className="roadmap-heading-copy">
            <h1 className="roadmap-title">Learning Roadmap</h1>
            <p className="roadmap-subtitle">
              Explore Concordia courses and online resources for your track,
              then apply what you learn to projects and a portfolio. Progress at
              your own pace and complete each course’s prerequisites first.
            </p>
          </div>

          <div className="roadmap-filter-groups">
            <div className="roadmap-chip-row">
              {TRACKS.map((track) => (
                <button
                  key={track}
                  type="button"
                  aria-pressed={activeTrack === track}
                  className={
                    activeTrack === track
                      ? "roadmap-chip is-active"
                      : "roadmap-chip"
                  }
                  onClick={() => handleTrackChange(track)}
                >
                  {track}
                </button>
              ))}
            </div>

            <div className="roadmap-chip-row roadmap-chip-row-secondary">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  className={
                    activeCategory === category
                      ? "roadmap-chip roadmap-chip-secondary is-active"
                      : "roadmap-chip roadmap-chip-secondary"
                  }
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="roadmap-progress-line">
          <div className="roadmap-progress-track" />
          <div
            className="roadmap-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
          <div className="roadmap-progress-nodes">
            {visibleStages.map((stage, stageIndex) => {
              const isActive = stage.id === activeStageId;
              const isComplete = stageIndex < activeStageIndex;

              return (
                <button
                  key={stage.id}
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  className={
                    isActive
                      ? "roadmap-progress-step is-active"
                      : isComplete
                        ? "roadmap-progress-step is-complete"
                        : "roadmap-progress-step"
                  }
                  onClick={() => handleStageSelect(stage.id)}
                >
                  <span className="roadmap-progress-node" />
                  <span className="roadmap-progress-label">{stage.title}</span>
                  <span className="roadmap-progress-summary-label">
                    {stage.summary}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="roadmap-stage-grid">
          {visibleStages.map((stage, stageIndex) => (
            <section
              className={
                activeStageId === stage.id
                  ? "roadmap-stage-card is-active"
                  : "roadmap-stage-card"
              }
              id={`stage-${stage.id}`}
              key={stage.id}
              ref={(element) => {
                stageRefs.current[stage.id] = element;
              }}
              tabIndex={-1}
            >
              <div className="roadmap-stage-head">
                <h2 className="roadmap-stage-title">{stage.title}</h2>
                <p className="roadmap-stage-summary">{stage.summary}</p>
              </div>

              <div className="roadmap-stage-items">
                {stage.items.length > 0 ? (
                  stage.items.map((item, itemIndex) => {
                    const paletteClass =
                      (stageIndex + itemIndex) % 2 === 0
                        ? "roadmap-item roadmap-item-pink"
                        : "roadmap-item roadmap-item-plum";

                    const content = (
                      <>
                        <div className="roadmap-item-meta">
                          <span className="roadmap-item-kind">{item.kind}</span>
                          <span className="roadmap-item-format">
                            {item.formats.join(" / ")}
                          </span>
                        </div>
                        <h3 className="roadmap-item-title">{item.title}</h3>
                        {item.description ? (
                          <p className="roadmap-item-description">
                            {item.description}
                          </p>
                        ) : null}
                        {item.prereqs ? (
                          <p className="roadmap-item-description">
                            <strong>Prerequisites:</strong> {item.prereqs}
                          </p>
                        ) : null}
                      </>
                    );

                    return item.link ? (
                      <a
                        className={paletteClass}
                        href={item.link}
                        key={item.title}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={paletteClass} key={item.title}>
                        {content}
                      </div>
                    );
                  })
                ) : (
                  <div className="roadmap-empty-state">
                    No {activeCategory.toLowerCase()} picks are listed for this
                    stage yet. Keep the milestone and swap in an equivalent
                    resource.
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="roadmap-stage-navigation">
          <button
            className="roadmap-stage-button"
            disabled={previousStage === null}
            onClick={() => {
              if (previousStage !== null) {
                handleStageSelect(previousStage.id);
              }
            }}
            type="button"
          >
            Previous stage
          </button>
          <div className="roadmap-stage-status">
            Step {activeStageIndex + 1} of {visibleStages.length}:{" "}
            <strong>{activeStage.title}</strong>
          </div>
          <button
            className="roadmap-stage-button"
            disabled={nextStage === null}
            onClick={() => {
              if (nextStage !== null) {
                handleStageSelect(nextStage.id);
              }
            }}
            type="button"
          >
            Next stage
          </button>
        </div>

        <div className="roadmap-footer">
          <p className="roadmap-footer-note">
            Choose courses that fit your goals. Design and Art courses may
            require foundations listed in the Programming track. Find all courses
            and prerequisites on the Get Started page.
          </p>
          <Link className="roadmap-return-button" to="/getStartedPage">
            Explore courses
          </Link>
        </div>
      </div>
    </main>
  );
}
