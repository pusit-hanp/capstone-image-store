import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import * as Yup from 'yup';
import axiosSet from '../axiosConfig';
import { Helmet } from 'react-helmet-async';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import '../styles/Login.css';

const Login = () => {
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const signIn = async (values) => {
    try {
      const post = { email: values.email, password: values.password };
      await axiosSet.post('/url', {
        body: post,
      });

      //   //Implement firebase auth
      //   await signInWithEmailAndPassword(getAuth(), values.email, values.password);

      // Successful login, navigate to another route
      navigate('/home');
    } catch (error) {
      // Handle error if login fails
      setError(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="text-center mt-5">DevCorner</h1>
      <div className="sign-in-body d-flex align-items-center justify-content-center flex-column mt-2">
        <Card
          className="signin-card mt-4"
          variant="outlined"
          sx={{
            width: 300,
            padding: 1,
          }}
        >
          <CardHeader
            title="Sign In"
            className="signin-card-header mt-2"
            sx={{
              fontSize: 20,
            }}
          />
          <CardContent className="signin-card-content">
            {error && <p className="error">{error}</p>}
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={signIn}
            >
              <Form>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="signin-field"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mt-3">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="signin-field"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    className="mt-3"
                    color="primary"
                    variant="contained"
                  >
                    Sign in
                  </Button>
                  <NavLink to="/register" className="mt-3">
                    Don't have an account yet? Sign up!
                  </NavLink>
                </div>
              </Form>
            </Formik>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
