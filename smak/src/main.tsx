import type { RouteObject } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import App from "./App";
import "../sass/index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routes as RouteObject[],
    HydrateFallback: App
  }
]);

// DynamicMap montera här TODO

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
