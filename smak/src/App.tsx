import { useLocation } from "react-router-dom";
import Main from "./partials/Main";
import Header from "./partials/Header";
import Footer from "./partials/Footer";

export default function App() {
  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  return <>
    <Header />
    <Main />
    <Footer />
  </>;
};
