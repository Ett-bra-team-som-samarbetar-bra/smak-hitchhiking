import { Button, Row } from "react-bootstrap";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess: onLogin }: LoginProps) {
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
      <Row className="dynamic-map-ontop-header non-interactive">
        <h1 className="text-white text-center"> Småk blabla</h1>
        <p className="text-white text-center">No zoom on map cool only rotate yes</p>
      </Row>

      <Row className="dynamic-map-ontop-content px-3 d-flex flex-column">
        <Button
          className="btn btn-light mb-3 rounded-5 py-2"
          onClick={handleRegister}>
          Registera ba
        </Button>

        <Button
          className="btn btn-primary rounded-5 py-2"
          onClick={handleLogin}>
          Logga in ba
        </Button>
      </Row >
    </>
  )
}
