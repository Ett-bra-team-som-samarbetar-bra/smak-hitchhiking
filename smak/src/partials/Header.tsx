import { NavLink, useLocation } from "react-router-dom";
import routes from "../routes";
import config from "../config/Config";

export default function Header() {
  const settingspath = "/settings";
  const contactsPath = "/contacts";
  const pathName = useLocation().pathname;
  const isActive = (path: string) => pathName === path;

  // Debug
  const debugRoutes = routes.filter(route =>
    ["/joggus", "/kalv", "/tungis"].includes(route.path)
  );

  return (
    <header className="header bg-white border-bottom d-flex align-items-center justify-content-between px-3 py-2">

      {/* Contacts */}
      <NavLink
        to={contactsPath}
        className={`
          ${isActive(contactsPath) ? "text-black text-grow" : "text-secondary"}
        `}>
        <i className="bi bi-people-fill nav-icon-size" />
      </NavLink>

      {/* Debug routes */}
      {config.showDebugPages && debugRoutes.map(route => (
        <NavLink
          key={route.path}
          to={route.path}>
          <i className={`bi bi-${route.icon} text-center nav-icon-size text-danger`} />
        </NavLink>
      ))}

      {/* Logo */}
      <div className="header-div d-flex align-items-center gap-1 justify-content-center mb-0">
        <i className="header-icon" />
        <h2 className="mb-0">Småk</h2>
      </div>

      {/* Settings */}
      <NavLink
        to={settingspath}
        className={`
          ${isActive(settingspath) ? "text-black text-grow" : "text-secondary"}
        `}>
        <i className="bi bi-gear-fill nav-icon-size" />
      </NavLink>
    </header>
  );
}
