import React, { Suspense, lazy } from "react";

// Lazy load your component
const AnimationEditor = lazy(() => import("./src/App"));

export default function Page() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0a",
            color: "#ffffff",
          }}
        >
          Loading Animation Editor...
        </div>
      }
    >
      <AnimationEditor />
    </Suspense>
  );
}
