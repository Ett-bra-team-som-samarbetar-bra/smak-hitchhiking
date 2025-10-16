import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const settingspath = "/settings";
  const contactsPath = "/contacts";
  const pathName = useLocation().pathname;
  const isActive = (path: string) => pathName === path;

  return (
    <header className="header bg-white border-bottom d-flex align-items-center justify-content-between px-3 py-2">
      <NavLink
        to={contactsPath}
        className={`
          ${isActive(contactsPath) ? "text-black text-grow" : "text-secondary"}
        `}>
        <i className="bi bi-people-fill nav-icon-size" />
      </NavLink>

      <div className="header-div d-flex align-items-center gap-1 justify-content-center mb-0">
        <i className="header-icon" />
        <h2 className="mb-0">Småk</h2>
      </div>

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
