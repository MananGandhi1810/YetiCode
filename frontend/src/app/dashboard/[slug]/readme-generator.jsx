import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReadmeGenerator({slug}) {
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
        <p>README generator content will be displayed here.</p>
        {/* Add more content and components for README generation */}
        
      </CardContent>
    </Card>
  );
}
