import { NavLink, useLocation } from "react-router-dom";


export default function Header() {
  const path = "/settings";
  const pathName = useLocation().pathname;
  const isActive = (path: string) => pathName === path;

  return (
    <header className="header bg-white border-bottom">
      <div className="header-logo d-flex align-items-center gap-2 justify-content-center mb-0">
        <i className="bi bi-house-door-fill" />
        <h2 className=" mb-0">SMÅK</h2>
      </div>

      <NavLink
        to={path}
        className={`
          header-icon
          ${isActive(path) ? "text-black text-grow" : "text-secondary"}
        `}
      >
        <i className="bi bi-gear-fill nav-icon-size" />
      </NavLink>
    </header>
  );
}
