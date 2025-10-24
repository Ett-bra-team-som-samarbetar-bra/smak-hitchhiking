import { Outlet, useLocation } from "react-router-dom";

export default function Main() {
  const location = useLocation();
  const noPaddingPages = ["/", "/drive"]; // Remove global padding for specific pages
  const shouldHavePadding = !noPaddingPages.includes(location.pathname);

  return (
    <main
      className={`whole-app-horizontal-width m-auto w-100
      ${shouldHavePadding ? "py-3 whole-app-horizontal-padding" : ""}`}>
      <Outlet />
    </main>
  );
}
