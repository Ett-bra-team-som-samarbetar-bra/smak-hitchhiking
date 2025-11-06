import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { TripCountProvider, useTripCount } from "./context/TripCountProvider";
import { SmakTopAlertProvider } from "./context/SmakTopAlertProvider";
import { getTripDateTime } from "./utils/DateUtils";
import DynamicMapProvider, {
  useDynamicMap,
} from "./context/DynamicMapProvider";
import AuthProvider from "./context/AuthProvider";
import Main from "./partials/Main";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import DesktopPage from "./pages/desktop/DesktopPage";
import config from "./config/Config";
import DynamicMap from "./partials/DynamicMap";
import OnTripProvider from "./context/OnTripProvider";
import useAllTrips from "./hooks/useAllTrips";
import useUserTrips from "./hooks/useUserTrips";

function AppContent() {
  const { user } = useAuth();
  const { setIsLoginPage } = useDynamicMap();

  const [isPwa, setIsPwa] = useState(false);
  const [showHeaderFooter, setShowHeaderFooter] = useState(false);
  const { setHistoryCount, setComingCount } = useTripCount();

  const isLoggedIn = !!user;
  const mapActivePaths = ["/", "/drive"];
  const shouldShowMap = mapActivePaths.includes(location.pathname);
  const allTrips = useAllTrips();
  const userTrips = useUserTrips(user?.id ?? "", allTrips);

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  // Set trip counters globally
  useEffect(() => {
    if (!user) return;

    // History
    const pastTrips = userTrips.filter(
      (trip) =>
        trip.arrivalTime &&
        new Date(trip.arrivalTime).getTime() < Date.now()
    );
    setHistoryCount(pastTrips.length);

    // Coming 
    const today = new Date();
    const upcomingTrips = userTrips.filter(
      (trip) => getTripDateTime(trip) > today
    );
    setComingCount(upcomingTrips.length);
  }, [user, userTrips, setHistoryCount, setComingCount]);

  // DynamicMap
  useEffect(() => {
    setIsLoginPage(!isLoggedIn);
  }, [isLoggedIn, setIsLoginPage]);

  // Is PWA?
  useEffect(() => {
    const checkPwaStatus = () => {
      const isPwaMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;
      setIsPwa(isPwaMode);
    };

    checkPwaStatus();
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    mediaQuery.addEventListener("change", checkPwaStatus);

    return () => {
      mediaQuery.removeEventListener("change", checkPwaStatus);
    };
  }, []);

  // Header/footer animation
  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(
        () => setShowHeaderFooter(true),
        config.headerFooterAnimationDelay
      );
    } else {
      setShowHeaderFooter(false);
    }
  }, [isLoggedIn]);

  // Desktop landing page
  if (!isPwa && !config.hideDesktopPage) {
    return <DesktopPage />;
  }

  // PWA
  return (
    <>
      <div
        className={`header-container ${showHeaderFooter ? "header-visible" : "header-hidden"
          }`}
      >
        <Header />
      </div>
      <Main />
      <div
        className={`footer-container ${showHeaderFooter ? "footer-visible" : "footer-hidden"
          }`}
      >
        <Footer />
      </div>
      <DynamicMap
        className={`dynamic-map-container ${shouldShowMap ? "" : "dynamic-map-hidden"
          }`}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SmakTopAlertProvider>
        <DynamicMapProvider>
          <TripCountProvider>
            <OnTripProvider>
              <AppContent />
            </OnTripProvider>
          </TripCountProvider>
        </DynamicMapProvider>
      </SmakTopAlertProvider>
    </AuthProvider>
  );
}
