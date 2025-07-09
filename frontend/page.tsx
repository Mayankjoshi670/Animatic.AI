import React, { Suspense, lazy, useState } from "react";
const AnimationEditor = lazy(() => import("./src/App"));
import AuthPage from "./src/components/Auth";

export default function Page() {
  const [isVerified, setIsVerified] = useState(false);

  if (!isVerified) {
    return <AuthPage onAuthSuccess={() => setIsVerified(true)} />;
  }

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
