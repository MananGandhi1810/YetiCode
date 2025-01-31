import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Mermaid from "./mermaid";

export default function DiagramRenderer({ data }) {
  if (!data) {
    return <div>Loading diagram data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Diagram</CardTitle>
        <CardDescription>
          Visual representation of the system architecture
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Mermaid chart={data.diagram_code} />
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Diagram Explanation:</h3>
          <p className="mt-2">{data.info}</p>
        </div>
      </CardContent>
    </Card>
  );
}
