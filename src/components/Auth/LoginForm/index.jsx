import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Styles/loginForm.scss';
import { UserContext } from '../../../context/userContext';
import { useUser } from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '../../../context/errorContext';

const LoginForm = () => {
  const { isLogged } = useContext(UserContext);
  const { loginUser } = useUser();
  const navigate = useNavigate();
  const { setLoading } = useContext(ErrorContext);

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('e-mail is required'),
    password: Yup.string()
      .required('password is required')
      .trim()
      .min(8, 'password must have at least 8 characters')
      .matches(
        /^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
        'special character required'
      )
  });
  

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await loginUser(values);
      if (isLogged === true) {
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
    } catch (error) {
      console.log('Login error:', error);
    }
    setLoading(false);
  };
  

  return (
    <div className="login-form">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="email" aria-label="Email">
              Email
            </label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="password" aria-label="Password">
              Password
            </label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>

          <button type="submit" aria-label="Submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
