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

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= config.widthBreakpointDesktop);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return <>
    {isDesktop
      ? (<DesktopPage />)
      : (<>
        <Header />
        <Main />
        <Footer />
      </>
      )}
  </>;
};
