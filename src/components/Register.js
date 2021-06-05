import { useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const { addUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const displayNameRef = useRef();
  const schoolRef = useRef();
  const roleRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(roleRef.current.value + " maoxin");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        displayNameRef.current.value
      );
      addUser(
        emailRef.current.value,
        displayNameRef.current.value,
        schoolRef.current.value,
        roleRef.current.value
      );
      history.push("/login");
    } catch (error) {
      console.error(error);
      setError("Failed to create an account");
    }
  }

  return (
    <div
      className="containerForSignupLogin"
      style={{ textAlign: "center", maxWidth: 500 }}
    >
      <h1 className="header">Sign Up</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <div style={{ textAlign: "left" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="displayName">
            <Form.Label>Name </Form.Label>
            <Form.Control size="sm" type="text" ref={displayNameRef} required />
          </Form.Group>
          <Form.Group id="email">
            <Form.Label>Email </Form.Label>
            <Form.Control size="sm" type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="school">
            <Form.Label>School</Form.Label>
            <Form.Control ref={schoolRef} size="sm" as="select" custom>
              <option>National University of Singapore</option>
              <option>National Technical University</option>
              <option>Singapore Management University</option>
            </Form.Control>
          </Form.Group>
          <Form.Group id="role">
            <Form.Label>Account Type</Form.Label>
            <Form.Control ref={roleRef} size="sm" as="select" custom>
              <option>Student</option>
              <option>Tutor</option>
            </Form.Control>
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password </Form.Label>
            <Form.Control size="sm" type="password" ref={passwordRef} />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Password Confirmation </Form.Label>
            <Form.Control size="sm" type="password" ref={passwordConfirmRef} />
          </Form.Group>

          <Button disabled={loading} className="btn" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
