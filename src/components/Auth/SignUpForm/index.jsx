import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './styles/signUp.scss';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { ErrorContext } from '../../../context/errorContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const { setError, setErrorMessage } = useContext(ErrorContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      age: '',
      name: '',
      lastname: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .required('password is required')
        .trim()
        .min(8, 'password must have at least 8 characters')
        .matches(
          /^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
          'password must contain at least one special character'
        ),
      age: Yup.number()
        .required('age is required')
        .min(1, 'age must be at least 1')
        .max(99, 'age must be less than or equal to 99')
        .integer('age must be a whole number'),
      name: Yup.string().required('name is required'),
      lastname: Yup.string().required('lastname is required'),
    }),

    onSubmit: async (values) => {
      try {
        await updateUser(values);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setErrorMessage(error);
        setError(true);
      }
    },
  });

  return (
    <section className="signup-container">
      <h2>Sign Up</h2>
        <form className="signup-form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" aria-label="Email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password" aria-label="Password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="age" aria-label="Age">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              onChange={formik.handleChange}
              value={formik.values.age}
            />
            {formik.errors.age && formik.touched.age && (
              <div className="error">{formik.errors.age}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name" aria-label="Name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastname" aria-label="Lastname">
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              onChange={formik.handleChange}
              value={formik.values.lastname}
            />
            {formik.errors.lastname && formik.touched.lastname && (
              <div className="error">{formik.errors.lastname}</div>
            )}
          </div>
          <button type="submit" aria-label="Sign Up">
            Sign Up
          </button>
        </form>
    </section>
  );
};

export default SignUpForm;
