"use client";

import { useApp } from "../providers/app-provider";
import ResultCard from "./result-card";

const RANK_POINTS = {
    rank1: 30,
    rank2: 20,
    rank3: 10,
};

export default function ResultsTab() {
    const { dishes, votesByUser, currentUser } = useApp();

    // Calculate total points per dish
    const results = dishes.map((dish) => {
        let points = 0;

        Object.values(votesByUser).forEach((userVotes) => {
            Object.entries(userVotes).forEach(([rank, dishId]) => {
                if (dishId === dish.id) {
                    points += RANK_POINTS[rank] ?? 0;
                }
            });
        });

        return { ...dish, points };
    });

    // Sort descending by points
    const sortedResults = [...results].sort(
        (a, b) => b.points - a.points
    );

    return (
        <div className="space-y-4">
            {sortedResults.map((dish, index) => (
                <ResultCard
                    key={dish.id}
                    dish={dish}
                    rank={index + 1}
                    currentUserVotes={votesByUser[currentUser.id]}
                />
            ))}
        </div>
    );
}
