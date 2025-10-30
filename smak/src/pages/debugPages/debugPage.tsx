import { NavLink } from "react-router-dom";
import routes from "../../routes";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "react-bootstrap";

export default function DebugPagePage() {
  const { logout } = useAuth();

  const debugRoutes = routes.filter((route) =>
    ["/joggus", "/kalv", "/tungis", "/payment"].includes(route.path)
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="d-flex align-items-center flex-column h-100 position-relative">
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: 'url("/images/development/kalv.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
          zIndex: -1,
        }}
      />

      <h1 className="mb-4 text-danger fw-bold">Debug Ba</h1>

      {debugRoutes.map((route) => (
        <NavLink key={route.path} to={route.path} className="mb-2 fw-bold">
          <i
            className={`bi bi-${route.icon} text-center nav-icon-size text-danger me-2`}
          />
          {route.path}
        </NavLink>
      ))}

      <Button
        onClick={handleLogout}
        className="btn btn-danger mt-4 fw-bold">
        <i className="bi bi-box-arrow-right me-2" />
        Logga ut
      </Button>
    </div>
  );
}
