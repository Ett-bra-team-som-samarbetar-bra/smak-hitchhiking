import { Button, Row } from "react-bootstrap";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function LoginOrRegister({ onLoginSuccess: onLogin }: LoginProps) {
  // todo
  const handleLogin = async () => {
    console.log("login");
    onLogin();
  };

  const handleRegister = async () => {
    console.log("register");
  };

  return (
    <>
      {/* Header TODO */}
      <Row className="dynamic-map-ontop-header non-interactive">
        <div className="d-flex align-items-center flex-column justify-content-center">
          <i className="login-header-icon" />
          <h1 className="display-4 fw-bold text-white text-center">
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
    </>
  )
}
