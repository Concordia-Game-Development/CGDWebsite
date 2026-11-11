import { shrekathonWinners } from "~/components/game-jam/config";
import type { Winner } from "~/components/game-jam/types";

export default function Winners({ winners = shrekathonWinners }: { winners?: Winner[] }) {
  // Centre the podium when there are only 3 winners (the layout fits 4 columns)
  const centerOffset = winners.length === 3 ? 80 : 0;
  return (
    <section id="game-jam-winners" className="max-w-5xl mx-auto mb-20 text-center md:text-left font-corbert font-bold">
      <h2 className="text-4xl font-bold text-dark-purple mb-6">Top Winners 🏆</h2>
      <div className="max-w-4xl mx-auto">
        <svg width="100%" viewBox="0 70 680 250" xmlns="http://www.w3.org/2000/svg" className="font-corbert">
          {winners.map((winner, index) => {
            const positions = [
              { x: 45, labelX: 117, fill: "#D3D1C7", stroke: "#5F5E5A" },
              { x: 210, labelX: 280, fill: "#FAC775", stroke: "#BA7517" },
              { x: 370, labelX: 440, fill: "#F5C4B3", stroke: "#993C1D" },
              { x: 530, labelX: 600, fill: "#F5C4B3", stroke: "#993C1D" },
            ].map((p) => ({ ...p, x: p.x + centerOffset, labelX: p.labelX + centerOffset }))[index] ?? { x: 45 + index * 160, labelX: 117 + index * 160, fill: "#D3D1C7", stroke: "#5F5E5A" };
            return (
              <g key={winner.category} className="group cursor-pointer">
                <rect className={`winner-podium ${index === 1 ? "winner-first" : ""}`} x={positions.x} y={index === 1 ? 110 : 170} width="140" height={index === 1 ? 190 : 130} rx="4" fill={positions.fill} stroke={positions.stroke} strokeWidth="0.5" />
                <rect className="winner-name-box" x={positions.x + 10} y={index === 1 ? 115 : 175} width="120" height="30" rx="4" fill="white" stroke="#ccc" strokeWidth="0.5" />
                <text className="winner-name" x={positions.labelX} y={index === 1 ? 131 : 191} textAnchor="middle" dominantBaseline="central" fontSize="12">
                  {winner.link ? <a className="winner-link" href={winner.link}>{winner.name}</a> : winner.name}
                </text>
                <text className="winner-category" x={positions.labelX} y={index === 1 ? 98 : 158} textAnchor="middle" fontSize="12">{winner.category}</text>
              </g>
            );
          })}
          <rect className="winner-base" x="30" y="300" width="730" height="12" rx="3" fill="#ccc" />
        </svg>
      </div>
    </section>
  );
}
