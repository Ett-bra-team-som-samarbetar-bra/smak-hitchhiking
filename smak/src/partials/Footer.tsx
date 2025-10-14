import { Row, Col } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import routes from "../routes";

export default function Footer() {
  let allowedPaths = [
    "/profile",
    "/drive",
    "/",
    "/history",
    "/contact"
  ];


  /* if pågående resa todo
  allowedPaths = [
    "/profile",
    "/trips-current",
    "/contact",
  ]; */


  const pathName = useLocation().pathname;
  const isActive = (path: string) => pathName === path;

  return (
    <footer className="bg-white">
      <Row className="m-0">
        <Col className="d-flex align-items-center justify-content-between py-3">

          {routes
            .filter(route => route.menuLabel && allowedPaths.includes(route.path))
            .map((route, i) => (

              <NavLink
                to={route.path}
                className={`
                  ${isActive(route.path) ? "text-black text-grow" : "text-secondary"} 
                  text-decoration-none d-flex flex-column justify-content-center nav-link-set-width`}
                key={i}>
                <i className={`bi bi-${route.icon} text-center  nav-icon-size`} />
                <p className="text-center nav-link-size m-0" key={i}>
                  {route.menuLabel}
                </p>
              </NavLink>
            ))}
        </Col>
      </Row >
    </footer >
  );
}
