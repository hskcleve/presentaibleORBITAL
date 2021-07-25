import { useAuth } from "../contexts/AuthContext";
import { useRef, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/loggedin");
      console.log("moving to login");
    } catch {
      setError("Incorrect email or password");
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <div
      className="containerForSignupLogin"
      style={{ textAlign: "center", maxWidth: 350 }}
    >
      <h1 className="header">Log In</h1>
      <div style={{color:"darkred"}}>{error && <Alert variant="danger">{error}</Alert>}</div>
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <div style={{ marginTop: 20 }}>Email </div>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <div style={{ marginTop: 20 }}>Password </div>
            <Form.Control type="password" ref={passwordRef} />
          </Form.Group>
          <Button
            style={{ marginTop: 20 }}
            disabled={loading}
            className="btn"
            type="submit"
          >
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
