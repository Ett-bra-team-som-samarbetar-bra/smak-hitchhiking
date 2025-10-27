import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";

export default function LoginPage() {
  const { login, logout, user, refreshUser } = useAuth();
  const [usernameOrEmail, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(usernameOrEmail, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      refreshUser();
    }
  });

  const handleLogout = async () => {
    logout();
  };
  return (
    <Container fluid className="h-100 p-3">
      <Row className="mb-3">
        <Col md={12} className="h-100">
          <div className="d-flex justify-content-center align-items-center flex-column h-100">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError(null);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            {user && (
              <div className="mt-3 text-success">
                Logged in as {user.username}
              </div>
            )}
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
    </Container>
  );
}
