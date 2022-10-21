import React, { useRef, useState } from "react";
import { Alert, Container, Card, Button, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const { signup, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError("");
      console.log(emailRef.current.value, passwordRef.current.value);
      await signup(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to create an account");
      setLoading(false);
    }
  };

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: "100vh" }}
    >
      <div className='w-100' style={{ maxWidth: "400px" }}>
        {user ? (
          <Alert variant='success'>{user.email}</Alert>
        ) : (
          <>
            <Card className='w-100'>
              <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                {!loading ? (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id='email' className='mb-4'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password' className='mb-4'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        ref={passwordRef}
                        required
                      />
                    </Form.Group>
                    <Button
                      disabled={loading}
                      className='w-100 mb-2'
                      type='submit'
                    >
                      Sign Up
                    </Button>
                  </Form>
                ) : (
                  <div>Loading...</div>
                )}
              </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
              Already have an account?
              <a href='/login'> login</a>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};
