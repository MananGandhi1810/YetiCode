"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, GitBranch, Clock, Globe, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getRepoName(url) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?github\.com\/[^\/]+\/([^\/]+)(?:\.git)?\/?$/;
    const match = url.match(regex);
    return match ? match[1].replace(/\.git$/, "") : null;
  }
  function getRepoFullName(url) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?\/?$/;
    const match = url.match(regex);
    return match ? `${match[1]}/${match[2].replace(/\.git$/, "")}` : null;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem("accessToken");
        const [projectsResponse, reposResponse] = await Promise.all([
          axios.get("https://dt-backend.mpst.me/webhook/list", {
            headers: { authorization: `Bearer ${accessToken}` },
          }),
          axios.get("https://dt-backend.mpst.me/repository/list", {
            headers: { authorization: `Bearer ${accessToken}` },
          }),
        ]);
        setProjects(projectsResponse.data.data.webHookData || []);
        setRepositories(reposResponse.data.data.repositories || []);
        console.log(reposResponse.data.data.repositories);
        console.log(projectsResponse.data.data.webHookData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addProject = async (repo) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log(repo);
      await axios.post(
        `https://dt-backend.mpst.me/repository/create-webhook?repo=${repo.url}`,
        {},
        { headers: { authorization: `Bearer ${accessToken}` } }
      );
      // Refresh the projects list after adding
      const projectsResponse = await axios.get(
        "https://dt-backend.mpst.me/webhook/list",
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(projectsResponse.data);
      setProjects(projectsResponse.data.data || []);
    } catch (err) {
      console.error("Error adding project:", err);
      setError("Failed to add project. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mx-auto max-w-7xl p-5 space-y-10 lg:px-8 lg:py-32">
      <div className="flex justify-between items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Projects
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Select a repository to add as a new project.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[300px] w-full p-4">
              {repositories.map((repo) => (
                <div
                  key={repo.name}
                  className="flex items-center space-x-2 mb-4"
                >
                  <Checkbox
                    id={`repo-${repo.name}`}
                    onCheckedChange={() => addProject(repo)}
                  />
                  <label
                    htmlFor={`repo-${repo.name}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {repo.name}
                  </label>
                  {repo.visibility === "public" ? (
                    <Globe className="h-4 w-4 text-green-500" />
                  ) : (
                    <Lock className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              ))}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <div className="text-center text-gray-500">No projects yet</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a href={`/dashboard/${project.id}`} key={project.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{project.repoUrl}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <GitBranch className="w-4 h-4 mr-1" />
                      {project.defaultBranch || "main"}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {project.lastUpdated || "Unknown"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
