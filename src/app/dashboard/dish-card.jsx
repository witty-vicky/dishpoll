"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { toast } from "sonner";
import { useApp } from "../providers/app-provider";

const RANK_LABELS = {
    rank1: "Rank 1 (30 pts)",
    rank2: "Rank 2 (20 pts)",
    rank3: "Rank 3 (10 pts)",
};

export default function DishCard({ dish }) {
    const { currentUser, votesByUser, setVotesByUser } = useApp();

    const userVotes =
        currentUser && votesByUser[currentUser.id]
            ? votesByUser[currentUser.id]
            : {};
    const currentRank = Object.entries(userVotes).find(
        ([_, dId]) => dId === dish.id
    )?.[0] ?? "none";

    function handleRankChange(value) {
        const rank = value === "none" ? null : value;

        setVotesByUser((prev) => {
            const votes = prev[currentUser.id] ?? {
                rank1: null,
                rank2: null,
                rank3: null,
            };

            const updated = { ...votes };

            // remove dish from previous rank
            Object.keys(updated).forEach((r) => {
                if (updated[r] === dish.id) updated[r] = null;
            });

            // assign new rank
            if (rank) updated[rank] = dish.id;

            return { ...prev, [currentUser.id]: updated };
        });

        toast.success("Vote updated", {
            description: rank
                ? `${dish.dishName} set to ${RANK_LABELS[rank]}`
                : `${dish.dishName} removed from ranking`,
        });
    }

    return (
        <Card>
            <Image
                src={dish.image}
                alt={dish.dishName}
                width={100}
                height={100}
                className="h-48 w-full object-cover rounded-t-md"
            />

            <CardContent className="space-y-3 pt-4">
                <div>
                    <h3 className="font-semibold">{dish.dishName}</h3>
                    <p className="text-sm text-muted-foreground">
                        {dish.description}
                    </p>
                </div>

                {currentRank !== "none" && (
                    <Badge>{RANK_LABELS[currentRank]}</Badge>
                )}

                <Select value={currentRank} onValueChange={handleRankChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select rank" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">No Rank</SelectItem>
                        <SelectItem value="rank1">Rank 1</SelectItem>
                        <SelectItem value="rank2">Rank 2</SelectItem>
                        <SelectItem value="rank3">Rank 3</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
}
