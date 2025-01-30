import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitPullRequest } from "lucide-react";

export default function CodeReview({slug}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitPullRequest className="w-6 h-6 text-green-500" />
          Code Review
        </CardTitle>
        <CardDescription>
          Get AI-powered insights and suggestions for your code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Code review content will be displayed here.</p>
        {/* Add more content and components for code review */}
      </CardContent>
    </Card>
  );
}
