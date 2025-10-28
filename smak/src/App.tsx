import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import AuthProvider from "./context/AuthProvider";
import Main from "./partials/Main";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import DesktopPage from "./pages/desktop/DesktopPage";
import config from "./config/Config";

export default function App() {
  const { user } = useAuth();
  const [isPwa, setIsPwa] = useState(false);

  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

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

  // Desktop landing page
  if (!isPwa && !config.hideDesktopPage) {
    return <DesktopPage />
  }

  // PWA
  return (
    <AuthProvider>
      <Header />
      <Main />
      <Footer />
    </AuthProvider>
  );
}
