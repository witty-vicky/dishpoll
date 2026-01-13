"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const USER_RANK_LABELS = {
    rank1: "Your Rank 1",
    rank2: "Your Rank 2",
    rank3: "Your Rank 3",
};

export default function ResultCard({ dish, rank, currentUserVotes }) {
    const userRank = Object.entries(currentUserVotes ?? {}).find(
        ([_, dishId]) => dishId === dish.id
    )?.[0];

    return (
        <Card>
            <CardContent className="flex items-center gap-4 py-4">
                <div className="text-2xl font-bold w-10">#{rank}</div>

                <Image
                    src={dish.image}
                    alt={dish.dishName}
                    width={100}
                    height={100}
                    className="h-16 w-16 rounded object-cover"
                />

                <div className="flex-1">
                    <h3 className="font-semibold">{dish.dishName}</h3>
                    <p className="text-sm text-muted-foreground">
                        {dish.points} points
                    </p>
                </div>

                {userRank && (
                    <Badge variant="secondary">
                        {USER_RANK_LABELS[userRank]}
                    </Badge>
                )}
            </CardContent>
        </Card>
    );
}
