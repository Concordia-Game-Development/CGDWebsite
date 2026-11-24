import React from "react";
import { shrekathonMentors } from "~/components/game-jam/config";
import type { Mentor } from "~/components/game-jam/types";

interface MentorCardProps {
    name: string;
    role: string;
    image: string;
    favoriteGame?: string;
    workshop?: string;
}

const MentorCard: React.FC<MentorCardProps> = ({
    name,
    role,
    image,
    favoriteGame,
    workshop,
}) => {
    return (
        <li className="group flex flex-col items-center bg-white/85 backdrop-blur-xl p-10 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]">
            <div className="relative mb-6">
                <div
                    className="absolute inset-0 rounded-full opacity-80 blur-2xl scale-125 transition-all duration-500 group-hover:opacity-100"
                    style={{
                        background:
                            "radial-gradient(circle at center, #ce798f 0%, rgba(206,121,143,0.2) 60%, transparent 100%)",
                    }}
                ></div>

                <img
                    src={image}
                    alt={name}
                    className="relative z-10 w-44 h-44 rounded-full object-cover border-[5px] border-white shadow-[0_0_25px_rgba(206,121,143,0.4)]"
                />
            </div>

            <h3 className="text-2xl font-bold text-dark-purple mb-1">{name}</h3>
            <p className="text-gray-600 font-medium text-center mb-3">{role}</p>
            {favoriteGame && workshop && (
                <div className="text-left text-gray-700 leading-relaxed max-w-xs">
                    <p>
                        <strong className="text-dark-purple">Favorite Game:</strong>{" "}
                        {favoriteGame}
                    </p>
                    <p className="mt-2">
                        <strong className="text-dark-purple">Workshop:</strong>{" "}
                        {workshop}
                    </p>
                </div>
            )}
        </li>
    );
};
const MentorsSection = ({ mentors = shrekathonMentors }: { mentors?: Mentor[] }) => {
    return (
        <section className="max-w-6xl mx-auto mb-24 text-center md:text-left">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {mentors.map((mentor, index) => (
                    <MentorCard key={index} {...mentor} />
                ))}
            </ul>
        </section>
    );
};

export default MentorsSection;