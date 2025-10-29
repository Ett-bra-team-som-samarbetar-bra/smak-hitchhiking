import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import AuthProvider from "./context/AuthProvider";
import Main from "./partials/Main";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import DesktopPage from "./pages/desktop/DesktopPage";
import config from "./config/Config";

function AppContent() {
  const { user } = useAuth();
  const [isPwa, setIsPwa] = useState(false);
  const [showHeaderFooter, setShowHeaderFooter] = useState(false);
  const isLoggedIn = !!user;

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

  // Header/footer animation
  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => setShowHeaderFooter(true), config.headerFooterAnimationDelay);
    } else {
      setShowHeaderFooter(false);
    }
  }, [isLoggedIn]);

  // Desktop landing page
  if (!isPwa && !config.hideDesktopPage) {
    return <DesktopPage />
  }

  // PWA
  return (
    <>
      <div className={`header-container ${showHeaderFooter ? 'header-visible' : 'header-hidden'}`}>
        {isLoggedIn && <Header />}
      </div>
      <Main />
      <div className={`footer-container ${showHeaderFooter ? 'footer-visible' : 'footer-hidden'}`}>
        {isLoggedIn && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
