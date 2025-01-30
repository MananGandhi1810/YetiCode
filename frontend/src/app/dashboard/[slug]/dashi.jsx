"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  FileText,
  GitPullRequest,
  MessageSquare,
} from "lucide-react";
import VulnerabilityAnalysis from "./vulnerability-analysis";
import ReadmeGenerator from "./readme-generator";
import CodeReview from "./code-review";
import ChatWithRepo from "./chat-with-repo";
import { useQueryState } from "nuqs";
export default function Dashi(slug) {
  
  const [activeTab, setActiveTab] = useQueryState("tabs", {
    defaultValue: "vulnerability",
  });
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="vulnerability" className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span className="hidden sm:inline">Vulnerability</span>
        </TabsTrigger>
        <TabsTrigger value="readme" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">README</span>
        </TabsTrigger>
        <TabsTrigger value="review" className="flex items-center gap-2">
          <GitPullRequest className="w-4 h-4" />
          <span className="hidden sm:inline">Code Review</span>
        </TabsTrigger>
        <TabsTrigger value="chat" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Chat</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="vulnerability">
        <VulnerabilityAnalysis />
      </TabsContent>
      <TabsContent value="readme">
        <ReadmeGenerator />
      </TabsContent>
      <TabsContent value="review">
        <CodeReview />
      </TabsContent>
      <TabsContent value="chat">
        <ChatWithRepo />
      </TabsContent>
    </Tabs>
  );
}
