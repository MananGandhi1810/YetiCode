"use client";
import { useState, useEffect } from "react";
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
import axios from "axios";
export default function Dashi({ slug }) {
  console.log(slug);
  const [activeTab, setActiveTab] = useQueryState("tabs", {
    defaultValue: "vulnerability",
  });
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/repository/generate?repo=${slug}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data;
      setData(data.data);
      setData(data);
      console.log(response.data);
    };
    fetchData();
  }, []);
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
        <VulnerabilityAnalysis data={data} />
      </TabsContent>
      <TabsContent value="readme">
        <ReadmeGenerator data={data.data.readme} />
      </TabsContent>
      <TabsContent value="review">
        <CodeReview slug />
      </TabsContent>
      <TabsContent value="chat">
        <ChatWithRepo slug />
      </TabsContent>
    </Tabs>
  );
}
