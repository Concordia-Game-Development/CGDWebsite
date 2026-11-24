import { shrekathonJudging } from "~/components/game-jam/config";
import type { JudgingData } from "~/components/game-jam/types";

export default function Judging({ judging = shrekathonJudging }: { judging?: JudgingData }) {
  return (
    <section id="gameshowcase-judging" className="max-w-5xl mx-auto mb-28 text-center md:text-left font-corbert font-bold">
      <h2 className="text-4xl font-bold text-dark-purple mb-10">Game Showcase & Judging</h2>
      <div className="text-lg text-gray-700 leading-relaxed space-y-8">
        <p>{judging.introduction}</p>
        <p>{judging.process}</p>
        <div className="relative border-l-4 border-dark-purple pl-6 ml-2">
          <h3 className="text-2xl font-semibold text-dark-purple mb-2">Evaluation criteria:</h3>
          <ul className="space-y-2 text-gray-800">
            {judging.criteria.map((criterion) => (
              <li key={criterion.name}>• {criterion.name} (1–{criterion.max})</li>
            ))}
          </ul>
        </div>
        <div className="relative border-l-4 border-dark-purple pl-6 ml-2">
          <h3 className="text-2xl font-semibold text-dark-purple mb-2">Winning Categories & Prizes</h3>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <ul className="space-y-2 text-gray-800 md:max-w-xl">
              {judging.awards.map((award) => (
                <li key={award.name}>• {award.name} – {award.prize}</li>
              ))}
            </ul>
            <div className="flex justify-center md:justify-end md:min-w-[360px]">
              <img src={judging.prizeImage} alt={judging.prizeImageAlt} className="max-h-64 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
