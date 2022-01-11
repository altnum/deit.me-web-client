import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { userService } from './Services';
import { useNavigate, Navigate } from "react-router-dom";
import './Login.css'

export const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const goToRegister = () => {
    history("/register");
  }

  const handleLogin = async () => {
    var t = await userService.login(email, password)
    if (email === '' || password === '' || t === false) {
      setError(true);
    } else {
      setError(false);
      history("/", { replace: true })
    }
  }

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Unsuccessfull login!</h1>
      </div>
    );
  };

  if (localStorage.getItem('user')) {
    return <Navigate to='/' />
  } else {
    return (
      <div>
        <div className="messages">
          {errorMessage()}
        </div>
        <div className='formWrapper'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <div className='logInBtn'>
              <Button variant="primary" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </Form>
        </div>
        <div className='redirectToSignUp'>
          You don't have an account yet?
          <Button variant="outline-primary" style={{ marginLeftL:'6px'}} onClick={goToRegister}>Signup now!</Button>
        </div>:
      </div>
    )
  }
}
