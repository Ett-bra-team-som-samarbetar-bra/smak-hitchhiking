import { Button, Row, } from "react-bootstrap";
import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function LoginOrRegister() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPage, setshowPage] = useState(true);

  const loginClicked = async () => {
    setShowLoginModal(true);
  };

  const registerClicked = async () => {
    setShowRegisterModal(true);
  };

  return (
    <>
      <div className={showPage ? "" : "d-none"}>
        <Row className="dynamic-map-ontop-header non-interactive">
          <div className="d-flex align-items-center flex-column justify-content-center">
            <i className="login-header-icon" />
            <h1 className="set-font-size fw-bold text-white text-center text-nowrap">
              Samåk med <span className="text-warning">Småk</span>
            </h1>
          </div>
        </Row>

        <Row className="dynamic-map-ontop-login px-3 d-flex flex-column">
          <Button
            className="btn btn-light mb-3 rounded-5 py-2 interactive shadow"
            onClick={registerClicked}>
            Skapa konto
          </Button>

          <Button
            className="btn btn-primary rounded-5 py-2 interactive shadow"
            onClick={loginClicked}>
            Logga in
          </Button>
        </Row >
      </div >

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        setshowPage={setshowPage} />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)} />
    </>
  )
}
