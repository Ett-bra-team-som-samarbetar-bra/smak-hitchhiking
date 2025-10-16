import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Main from "./partials/Main";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import DesktopPage from "./pages/desktop/DesktopPage";
import config from "./config/Config";

export default function App() {
  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  const [isPwa, setIsPwa] = useState(false);

  useEffect(() => {
    const checkPwaStatus = () => {
      const isPwaMode = window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;
      setIsPwa(isPwaMode);
    };

    checkPwaStatus();
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkPwaStatus);

    return () => {
      mediaQuery.removeEventListener('change', checkPwaStatus);
    };
  }, []);

  return <>
    {!isPwa && !config.dontShowDesktopPageWhenMakingTheAppOnlyShowMobileView
      ? (<DesktopPage />)
      : (<>
        <Header />
        <Main />
        <Footer />
      </>
      )}
  </>;
};
