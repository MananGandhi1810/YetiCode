import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function CodeReview({ data }) {
  if (!data) {
    return <div>Loading code review data...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Case Generator</CardTitle>
        <CardDescription>AI-generated test suite for your project</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {data.files.map((file, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{file.file_path}</AccordionTrigger>
              <AccordionContent>
                <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                  {file.content}
                </SyntaxHighlighter>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {data.info && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Additional Information:</h3>
            <p>{data.info}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

