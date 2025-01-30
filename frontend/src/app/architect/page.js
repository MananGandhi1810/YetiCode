"use client";
import React, { useEffect } from "react";
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

const FlowChartPage = () => {
  const chartData = `graph LR
    A[User] --> B{Register/Login}
    B -- Register --> C[User Creation]
    C --> D[Email Verification]
    D --> E[User Authentication]
    E --> F[JWT Token Generation]
    F --> G[Frontend]
    G --> H[Problem Selection]
    H --> I[Code Editor]
    I --> J[Code Submission]
    J --> K[Backend]
    K --> L[Code Execution]
    L --> M[Result]
    M --> G
    G --> N[AI Assistant]
    N --> K
    G --> O[Leaderboard]
    O --> K
    G --> P[User Profile]
    P --> K
    K --> Q[Database]
    Q --> K
    G --> R[Editorials]
    R --> K
    G -- Logout --> A`;

  const data = `graph LR\n    A[User] --> B{Register/Login};\n    B -- Register --> C[User Creation];\n    C --> D[Email Verification];\n    D --> E[User Authentication];\n    E --> F[JWT Token Generation];\n    F --> G[Frontend];\n    G --> H[Problem Selection];\n    H --> I[Code Editor];\n    I --> J[Code Submission];\n    J --> K[Backend];\n    K --> L[Code Execution];\n    L --> M[Result];\n    M --> G;\n    G --> N[AI Assistant];\n    N --> K;\n    G --> O[Leaderboard];\n    O --> K;\n    G --> P[User Profile];\n    P --> K;\n    K --> Q[Database];\n    Q --> K;\n    G --> R[Editorials];\n    R --> K; \n    G -- Logout --> A;`;
  const cleanedData = data.replace(/\\n/g, "\n"); 
  console.log(cleanedData);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">System Flow Chart</h1>
      <MermaidChart chartData={cleanedData} />
    </div>
  );
};

export default FlowChartPage;
