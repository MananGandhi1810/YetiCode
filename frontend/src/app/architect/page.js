"use client";
import React, { useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import mermaid from "mermaid";

const MermaidChart = ({ chartData }) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
    });
    mermaid.contentLoaded();
  }, [chartData]);

  return (
    <div className="w-full overflow-x-auto p-4">
      <pre className="mermaid">{chartData}</pre>
    </div>
  );
};

const FlowChartPage = ({ chartData }) => {
  console.log("datataa ", chartData);

  const cleanedData = chartData.replace(/\\n/g, "\n").replace(/[()/]/g, "");
  return (
    <div className="w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">System Flow Chart</h1>
      {/* <TransformWrapper>
        <TransformComponent> */}
      <MermaidChart chartData={cleanedData} />
      {/* </TransformComponent>
      </TransformWrapper> */}
    </div>
  );
};

export default FlowChartPage;
