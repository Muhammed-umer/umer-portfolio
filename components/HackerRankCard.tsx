"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { SiHackerrank } from "react-icons/si";

interface Badge {
    badge_name: string;
    stars: number;
    solved: number;
}

export default function HackerRankCard() {
    const [badges, setBadges] = useState<Badge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/hackerrank');
                const data = await res.json();
                if (data.models) {
                    // Filter out zero-star badges and sort by stars/solved
                    const activeBadges = data.models
                        .filter((b: any) => b.stars > 0)
                        .sort((a: any, b: any) => b.stars - a.stars || b.solved - a.solved)
                        .slice(0, 4); // Show top 4
                    setBadges(activeBadges);
                }
            } catch (err) {
                console.error("Failed to load HackerRank stats");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="liquid-glass lg-card w-full h-full min-h-[220px] flex items-center justify-center bg-[#ffffff]/40 rounded-3xl animate-pulse">
                <SiHackerrank className="w-8 h-8 text-green-500 opacity-50 animate-bounce" />
            </div>
        );
    }

    if (badges.length === 0) return null;

    const getRatingText = (stars: number) => {
        if (stars === 5) return "Gold";
        if (stars === 4) return "Silver";
        if (stars === 3) return "Bronze";
        return "";
    };

    const getRatingColor = (stars: number) => {
        if (stars === 5) return "text-yellow-400";
        if (stars === 4) return "text-gray-300";
        if (stars === 3) return "text-amber-600";
        return "text-green-400";
    };

    return (
        <a 
            href="https://www.hackerrank.com/profile/Md_umer77" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full h-full"
        >
            <div className="liquid-glass lg-card lg-lift lg-tilt lg-accent-emerald relative w-full h-full bg-[#ffffff]/40 rounded-3xl p-6 md:p-8 group overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex items-center gap-4 mb-6">
                    <div className="liquid-glass lg-chip p-3 rounded-2xl group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-300">
                        <SiHackerrank className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">HackerRank</h3>
                        <p className="text-sm text-green-400 font-medium">@Md_umer77</p>
                    </div>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-3 md:gap-4 mt-auto">
                    {badges.map((badge, idx) => (
                        <div key={idx} className="liquid-glass lg-chip lg-accent-emerald rounded-xl p-3 flex flex-col items-center justify-center text-center">
                            <h4 className="text-sm font-bold text-gray-200 mb-1">{badge.badge_name}</h4>
                            
                            <p className={`text-[10px] uppercase tracking-wider font-extrabold mb-1.5 ${getRatingColor(badge.stars)}`}>
                                {badge.stars} Star {getRatingText(badge.stars)}
                            </p>

                            <div className="flex items-center gap-0.5 text-yellow-400 mb-2">
                                {Array.from({ length: badge.stars }).map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-current" />
                                ))}
                            </div>
                            <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase">{badge.solved} Solved</p>
                        </div>
                    ))}
                </div>
            </div>
        </a>
    );
}
