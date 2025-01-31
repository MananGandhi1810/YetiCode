import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import Markdown from "react-markdown";

export default function ReadmeGenerator({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-500" />
          README Generator
        </CardTitle>
        <CardDescription>
          Automatically generate comprehensive README files for your projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Markdown>{data.readme}</Markdown>
        {/* {JSON.stringify(data.readme.readme)} */}
      </CardContent>
    </Card>
  );
}
