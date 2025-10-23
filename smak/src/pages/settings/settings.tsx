import { NavLink } from "react-router-dom";
import routes from "../../routes";
import config from "../../config/Config";

export default function SettingsPage() {

  // Debug
  const debugRoutes = routes.filter(route =>
    ["/joggus", "/kalv", "/tungis"].includes(route.path)
  );

  return (
    <div className="d-flex align-items-center flex-column h-100">
      <h1 className="mb-3">Settings</h1>

      {config.showDebugPages && debugRoutes.map(route => (
        <NavLink
          key={route.path}
          to={route.path}
          className="mb-2 fw-bold">
          <i className={`bi bi-${route.icon} text-center nav-icon-size text-danger me-2`} />
          {route.path}
        </NavLink>
      ))}
    </div>
  );
}