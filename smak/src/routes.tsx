import type { JSX } from "react";
import StartPage from "./pages/start/start";

interface Route {
  element: JSX.Element;
  path: string;
  menuLabel?: string;
  loader?: Function;
}

const routes: Route[] = [
  {
    element: <StartPage />,
    path: "/",
    menuLabel: "Start"
  }
];

export default routes;
