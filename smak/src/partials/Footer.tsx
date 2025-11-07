import { Row, Col } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useTripCount } from "../context/TripCountProvider";
import useOnTrip from "../hooks/useOnTrip";
import routes from "../routes";

export default function Footer() {
  const { historyCount, comingCount } = useTripCount();
  const { onTrip } = useOnTrip();

  let allowedPaths = ["/profile", "/drive", "/", "/history", "/coming-trips"];
  if (onTrip) {
    allowedPaths = ["/profile", "/trips-current", "/coming-trips"];
  }

  const pathName = useLocation().pathname;
  const isActive = (path: string) => pathName === path;

  return (
    <footer className="bg-white d-flex justify-content-center border-top">
      <div className="whole-app-horizontal-width w-100">
        <Row className="m-0 pb-3">
          <Col className="d-flex align-items-center justify-content-between pt-2 pb-3">
            {routes
              .filter(
                (route) => route.menuLabel && allowedPaths.includes(route.path)
              )
              .map((route, i) => (
                <NavLink
                  to={route.path}
                  key={i}
                  className={`position-relative text-decoration-none ${isActive(route.path)
                    ? "text-primary text-grow"
                    : "text-secondary"
                    } d-flex flex-column align-items-center justify-content-center nav-link-set-width`}
                >
                  <i
                    className={`bi bi-${route.icon} text-center nav-icon-size`}
                  />
                  <p className={`text-center nav-link-size m-0`} key={i}>
                    {route.menuLabel}
                  </p>

                  {/* Badge for /history */}
                  {route.path === "/history" && (
                    <span className="badge bg-primary footer-badge non-interactive">
                      {historyCount}
                    </span>
                  )}

                  {/* Badge for /coming-trips */}
                  {route.path === "/coming-trips" && (
                    <span className="badge bg-primary footer-badge non-interactive">
                      {comingCount}
                    </span>
                  )}
                </NavLink>
              ))}
          </Col>
        </Row>
      </div>
    </footer>
  );
}
