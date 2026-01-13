"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import VoteTab from "./vote-tab";
import ResultsTab from "./results-tab";

export default function DashboardPage() {
    return (
        <div className="container mx-auto py-6">
            <Tabs defaultValue="vote" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="vote">Vote</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>

                <TabsContent value="vote">
                    <VoteTab />
                </TabsContent>

                <TabsContent value="results">
                    <ResultsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
