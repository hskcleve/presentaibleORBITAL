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
    console.log(roleRef.current.value);

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
      <div style={{ textAlign: "left" ,marginTop:30}}>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="displayName">
            <div style={{marginTop:20}}>Name </div>
            <Form.Control type="text" ref={displayNameRef} required />
          </Form.Group>
          <Form.Group id="email">
          <div style={{marginTop:20}}>Email </div>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="school">
          <div style={{marginTop:20}}>School </div>
            <Form.Control ref={schoolRef} as="select">
              <option>NUS</option>
              <option>NTU</option>
              <option>SMU</option>
            </Form.Control>
          </Form.Group>
          <Form.Group id="role">
          <div style={{marginTop:20}}>Account Type </div>
            <Form.Control ref={roleRef} as="select">
              <option>Student</option>
              <option>Tutor</option>
            </Form.Control>
          </Form.Group>
          <Form.Group id="password">
          <div style={{marginTop:20}}>Password </div>
            <Form.Control  type="password" ref={passwordRef} />
          </Form.Group>
          <Form.Group id="password-confirm">
          <div style={{marginTop:20}}>Password Confirmation </div>
            <Form.Control type="password" ref={passwordConfirmRef} />
          </Form.Group>
          <div style={{textAlign:'center', marginTop:20}}>
          <Button disabled={loading} className="btn" type="submit">
            Submit
          </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
