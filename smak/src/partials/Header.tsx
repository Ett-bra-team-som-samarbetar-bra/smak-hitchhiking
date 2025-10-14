import { Col, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const path = "/settings";
  const pathName = useLocation().pathname;
  const isActive = (path: string) => pathName === path;

  return (
    <header className="bg-white w-100">

      {/* <Row className="m-0">

        <Col xs={2} className="" />

        <Col xs={8} className="">

        </Col>


        <Col xs={2}>
          <NavLink
            to={path}

            className={`
            ${isActive(path) ? "text-black text-grow" : "text-secondary"} 
            text-decoration-none d-flex flex-column justify-content-center nav-link-set-width pe-3`}>

            <i className={`bi bi-gear-fill text-center  nav-icon-size`} />

          </NavLink>
        </Col>


      </Row > */}
    </header >
  );
}
