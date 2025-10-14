import type { JSX } from "react";
import StartPage from "./pages/start/StartPage";
import ContactPage from "./pages/contacts/ContactPage";
import DrivePage from "./pages/drive/DrivePage";
import HistoryPage from "./pages/history/HistoryPage";
import ProfilePage from "./pages/profile/ProfilePage";
import TripsCurrentPage from "./pages/trips-current/TripsCurrentPage";
import SettingsPage from "./pages/settings/StartPage";

interface Route {
  element: JSX.Element;
  path: string;
  icon?: string;
  menuLabel?: string;
  loader?: Function;
}

const routes: Route[] = [
  {
    element: <ProfilePage />,
    path: "/profile",
    menuLabel: "Profil",
    icon: "person-fill-check"
  },
  {
    element: <DrivePage />,
    path: "/drive",
    menuLabel: "Kör",
    icon: "car-front-fill"
  },
  {
    element: <StartPage />,
    path: "/",
    menuLabel: "Start",
    icon: "geo-alt-fill "
  },
  {
    element: <HistoryPage />,
    path: "/history",
    menuLabel: "Historik",
    icon: "clock-fill"
  },
  {
    element: <TripsCurrentPage />,
    path: "/trips-current",
    menuLabel: "Pågående",
    icon: "car-front" // todo
  },
  {
    element: <ContactPage />,
    path: "/contact",
    menuLabel: "Kontakter",
    icon: "people-fill"
  },
  {
    element: <SettingsPage />,
    path: "/settings",
    menuLabel: "bläh",
    icon: "gear"
  },
];

export default routes;
