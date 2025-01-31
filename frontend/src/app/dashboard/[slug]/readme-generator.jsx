import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"

export default function ReadmeGenerator({ data }) {
  if (!data) {
    return <div>Loading README data...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated README</CardTitle>
        <CardDescription>AI-generated README for your project</CardDescription>
      </CardHeader>
      <CardContent >
        <ReactMarkdown className="prose max-w-none prose-invert">{data.readme}</ReactMarkdown>
      </CardContent>
    </Card>
  )
}

