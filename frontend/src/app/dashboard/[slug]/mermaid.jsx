"use client";
import { useEffect, useRef } from "react";
import mermaid from "mermaid";

export default function Mermaid({ chart }) {
  const mermaidRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    if (mermaidRef.current) {
      mermaid.render("mermaid-svg", chart).then((result) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = result.svg;
        }
      });
    }
  }, [chart]);

  return <div ref={mermaidRef} />;
}
