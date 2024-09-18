import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PiArrowCircleUpRightFill } from 'react-icons/pi';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function ConfirmPassword() {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setStatus }) => {
      // You can perform password update logic here
      // For demonstration, let's just set a success message
      setStatus('Password updated successfully!');
      console.log('Password updated successfully!');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="max-w-lg w-full p-8 bg-white rounded-md shadow-md relative">
        <h1 className="flex text-gray-600 text-3xl font-semibold justify-center mb-6">
          Confirm Password
        </h1>

        <div className="mb-4 flex justify-center">
          {formik.status && (
            <p className="text-green-500 text-center mb-2">
              <PiArrowCircleUpRightFill fontSize={20} className="inline-block mr-2" />
              {formik.status}
            </p>
          )}
        </div>

        <p className="flex justify-center text-gray-500 mb-6">
          Enter your new password.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6 relative">
            <label htmlFor="password" className="sr-only">
              New Password
            </label>
            <div className="relative">
              <input
                type={formik.values.showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-gray-600"
                placeholder="Enter new password"
              />
              <div
                className="absolute top-2 right-3 cursor-pointer"
                onClick={() => formik.setFieldValue('showPassword', !formik.values.showPassword)}
              >
                {formik.values.showPassword ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={formik.values.showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-gray-600"
                placeholder="Confirm new password"
              />
              <div
                className="absolute top-2 right-3 cursor-pointer"
                onClick={() => formik.setFieldValue('showConfirmPassword', !formik.values.showConfirmPassword)}
              >
                {formik.values.showConfirmPassword ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-400 text-white rounded-md px-4 py-2 mb-4 hover:bg-blue-600 ${
              !formik.isValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!formik.isValid}
          >
            Confirm Password
          </button>
        </form>

        <div className="flex justify-center">
          <p className="text-gray-600 mb-2">
            <Link to="/login" className="text-blue-500">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPassword;
