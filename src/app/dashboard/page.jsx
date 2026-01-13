"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../providers/app-provider";
import VoteTab from "./vote-tab";
import ResultsTab from "./results-tab";

export default function DashboardPage() {
    const router = useRouter();
    const { currentUser, setCurrentUser, isHydrated } = useApp();

    const displayUsername = currentUser?.username
        ? `${currentUser.username.charAt(0).toUpperCase()}${currentUser.username.slice(1)}`
        : "Guest";

    useEffect(() => {
        if (!isHydrated) return;
        if (!currentUser) {
            router.replace("/");
        }
    }, [currentUser, isHydrated, router]);

    function handleLogout() {
        setCurrentUser(null);
        router.push("/");
    }

    return (
        <div className="min-h-screen bg-muted/40">
            <div className="container mx-auto max-w-6xl px-4 py-10">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-semibold tracking-tight">🍕DishPoll</h1>
                        <p className="text-sm text-muted-foreground">
                            Rank your top dishes and see what the crowd loves.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-sm">
                            <div className="text-muted-foreground">Signed in as</div>
                            <div className="font-medium leading-tight">
                                {displayUsername}
                            </div>
                        </div>
                        <Button variant="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
                <Tabs defaultValue="vote">
                    <TabsList>
                        <TabsTrigger value="vote">Vote</TabsTrigger>
                        <TabsTrigger value="results">Results</TabsTrigger>
                    </TabsList>

                    <TabsContent value="vote" className="mt-0">
                        <VoteTab />
                    </TabsContent>

                    <TabsContent value="results" className="mt-0">
                        <ResultsTab />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
