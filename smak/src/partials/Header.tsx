import { NavLink, useLocation } from "react-router-dom";
import config from "../config/Config";

export default function Header() {
  const pathName = useLocation().pathname;
  const isActive = (path: string) => pathName === path;

  return (
    <header className="header bg-white border-bottom d-flex justify-content-center">
      <div className="whole-app-horizontal-width d-flex align-items-center justify-content-between px-3 py-2 w-100">

        {/* Debug or Hidden spacer */}
        {config.showDebugPages ? (
          <NavLink
            to={"/debug"}
            className="text-danger">
            <i className="bi bi-gear-fill nav-icon-size" />
          </NavLink>
        ) : (
          <i className="bi-people-fill nav-icon-size" style={{ visibility: "hidden" }} />
        )}

        {/* Logo */}
        <div className="d-flex align-items-center gap-1 justify-content-center mb-0">
          <i className="header-icon" />
          <h2 className="mb-0">Småk</h2>
        </div>

        {/* Contacts */}
        <NavLink
          to={"/contacts"}
          className={`${isActive("/contacts") ? "text-primary text-grow" : "text-secondary"}`}>
          <i className="bi bi-people-fill nav-icon-size" />
        </NavLink>
      </div>
    </header>
  );
}
