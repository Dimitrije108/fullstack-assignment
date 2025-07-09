import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ErrorBoundary } from "react-error-boundary";
import AuthProvider from "./context/AuthProvider";
import "./tailwind.css";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary 
      fallback={
        <h1 className="w-screen h-screen flex justify-center items-center">
          Something went wrong
        </h1>
      }
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
