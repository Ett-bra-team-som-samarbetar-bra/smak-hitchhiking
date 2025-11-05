import type { JSX } from "react";
import StartPage from "./pages/start/StartPage";
import ContactPage from "./pages/contacts/ContactPage";
import DrivePage from "./pages/drive/DrivePage";
import HistoryPage from "./pages/history/HistoryPage";
import ProfilePage from "./pages/profile/ProfilePage";
import TripsCurrentPage from "./pages/trips-current/TripsCurrentPage";
import ComingTripsPage from "./pages/trips-coming/ComingTripsPage";
import JoggusPage from "./pages/debugPages/JoggusPage";
import KalvPage from "./pages/debugPages/KalvPage";
import TungisPage from "./pages/debugPages/TungisPage";
import NotFoundPage from "./pages/notFound/NotFound";
import TripsFoundPage from "./pages/trips-found/TripsFoundPage";
import DebugPagePage from "./pages/debugPages/debugPage";
import ProtectedRoute from "./utils/ProtectedRoutes";
import AdminPage from "./pages/admin/AdminPage";
import TripsDonePage from "./pages/trips-done/TripsDonePage";

interface Route {
  element: JSX.Element;
  path: string;
  icon?: string;
  menuLabel?: string;
  loader?: Function;
}

const routes: Route[] = [
  {
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
    path: "/profile",
    menuLabel: "Profil",
    icon: "person-fill-check",
  },
  {
    element: <ProtectedRoute><TripsDonePage /></ProtectedRoute>,
    path: "/trips-done",
    icon: "car-front-fill",
  },
  {
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
    path: "/profile/:userId",
  },
  {
    element: (
      <ProtectedRoute>
        <DrivePage />
      </ProtectedRoute>
    ),
    path: "/drive",
    menuLabel: "Kör",
    icon: "car-front-fill",
  },
  {
    element: <StartPage />,
    path: "/",
    menuLabel: "Sök",
    icon: "geo-alt-fill ",
  },
  {
    element: (
      <ProtectedRoute>
        <HistoryPage />
      </ProtectedRoute>
    ),
    path: "/history",
    menuLabel: "Historik",
    icon: "clock-fill",
  },
  {
    element: (
      <ProtectedRoute>
        <TripsCurrentPage />
      </ProtectedRoute>
    ),
    path: "/trips-current",
    menuLabel: "Pågående resa",
    icon: "car-front-fill",
  },
  {
    element: (
      <ProtectedRoute>
        <ComingTripsPage />
      </ProtectedRoute>
    ),
    path: "/coming-trips",
    menuLabel: "Bokade",
    icon: "calendar-check-fill",
  },
  {
    element: (
      <ProtectedRoute>
        <TripsFoundPage />
      </ProtectedRoute>
    ),
    path: "/trips-found",
  },
  {
    element: (
      <ProtectedRoute>
        <ContactPage />
      </ProtectedRoute>
    ),
    path: "/contacts",
    icon: "people-fill",
  },
  {
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
    path: "/admin",
  },
  {
    element: (
      <ProtectedRoute>
        <NotFoundPage />
      </ProtectedRoute>
    ),
    path: "*",
  },

  // ############ Debug ############
  {
    element: (
      <ProtectedRoute>
        <DebugPagePage />
      </ProtectedRoute>
    ),
    path: "/debug",
    icon: "gear",
  },
  {
    element: (
      <ProtectedRoute>
        <JoggusPage />
      </ProtectedRoute>
    ),
    path: "/joggus",
    icon: "apple-music",
  },
  {
    element: (
      <ProtectedRoute>
        <KalvPage />
      </ProtectedRoute>
    ),
    path: "/kalv",
    icon: "android",
  },
  {
    element: (
      <ProtectedRoute>
        <TungisPage />
      </ProtectedRoute>
    ),
    path: "/tungis",
    icon: "tux",
  },
];

export default routes;
