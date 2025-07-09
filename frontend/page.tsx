import { lazy, Suspense, useState, useEffect, type JSX } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
const AnimationEditor = lazy(() => import("./src/App"));
import AuthPage from "./src/components/Auth";
import OAuthHandler from "./src/components/OAuthHandler";

export default function Page() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsVerified(true);
  }, []);

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    return token ? (
      children
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };

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
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<OAuthHandler />} />
        <Route
          path="/login"
          element={<AuthPage onAuthSuccess={() => setIsVerified(true)} />}
        />
        <Route
          path="/signup"
          element={<AuthPage onAuthSuccess={() => setIsVerified(true)} isSignup />}
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <AnimationEditor />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}
