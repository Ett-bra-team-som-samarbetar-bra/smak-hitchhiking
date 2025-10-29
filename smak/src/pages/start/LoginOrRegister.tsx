import { Button, Row } from "react-bootstrap";
import SmakSlideInModal from "../../components/SmakSlideInModal";
import { useState } from "react";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function LoginOrRegister({ onLoginSuccess: onLogin }: LoginProps) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // todo
  const handleLogin = async () => {
    console.log("login");
    onLogin();
  };

  const handleRegister = async () => {
    console.log("register");
    setShowRegisterModal(true);
  };

  return (
    <>
      {/* Header TODO */}
      <Row className="dynamic-map-ontop-header non-interactive">
        <div className="d-flex align-items-center flex-column justify-content-center">
          <i className="login-header-icon" />
          <h1 className="set-font-size fw-bold text-white text-center text-nowrap">
            Samåk med <span className="text-white">Småk</span>
          </h1>
        </div>
      </Row>

      {/* Buttons */}
      <Row className="dynamic-map-ontop-login px-3 d-flex flex-column">
        <Button
          className="btn btn-light mb-3 rounded-5 py-2"
          onClick={handleRegister}>
          Registrera
        </Button>

        <Button
          className="btn btn-primary rounded-5 py-2"
          onClick={handleLogin}>
          Logga in
        </Button>
      </Row >





      {/* Register */}
      <SmakSlideInModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}>

        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <h1>Hello from Modal!</h1>
        </div>

      </SmakSlideInModal>



    </>
  )
}
