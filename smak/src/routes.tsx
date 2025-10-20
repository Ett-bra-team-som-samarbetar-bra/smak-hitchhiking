import type { JSX } from "react";
import StartPage from "./pages/start/StartPage";
import ContactPage from "./pages/contacts/ContactPage";
import DrivePage from "./pages/drive/DrivePage";
import HistoryPage from "./pages/history/HistoryPage";
import ProfilePage from "./pages/profile/ProfilePage";
import TripsCurrentPage from "./pages/trips-current/TripsCurrentPage";
import SettingsPage from "./pages/settings/StartPage";
import ComingTripsPage from "./pages/trips-coming/ComingTripsPage";
import JoggusPage from "./pages/debug/JoggusPage";
import KalvPage from "./pages/debug/KalvPage";
import TungisPage from "./pages/debug/TungisPage";
import NotFoundPage from "./pages/notFound/ContactPage";

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
    menuLabel: "Sök",
    icon: "geo-alt-fill "
  },
  {
    element: <ComingTripsPage />,
    path: "/coming-trips",
    menuLabel: "Bokade",
    icon: "calendar-check-fill"
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
    icon: "car-front"
  },
  {
    element: <ContactPage />,
    path: "/contacts",
    icon: "people-fill"
  },
  {
    element: <SettingsPage />,
    path: "/settings",
    icon: "gear"
  },
  {
    element: <NotFoundPage />,
    path: "*"
  },

  // ############ Debug ############
  {
    element: <JoggusPage />,
    path: "/joggus",
    icon: "apple-music"
  },
  {
    element: <KalvPage />,
    path: "/kalv",
    icon: "android"
  },
  {
    element: <TungisPage />,
    path: "/tungis",
    icon: "tux"
  }
];

export default routes;
