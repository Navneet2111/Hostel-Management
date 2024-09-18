import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

function OTP() {
  const navigate = useNavigate();  

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
      .required('OTP is required'),
  });

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      navigate('/confirmPassword');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="max-w-lg w-full p-8 bg-white rounded-md shadow-md relative">
        <h1 className="flex text-gray-600 text-3xl font-semibold justify-center mb-6">
          OTP Verification
        </h1>

        <p className="flex justify-center text-gray-500 mb-6">
          Enter the OTP sent to your email.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6 relative">
            <label htmlFor="otp" className="sr-only">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-gray-600"
              placeholder="Enter OTP"
            />
            {formik.touched.otp && formik.errors.otp ? (
              <div className="text-red-500">{formik.errors.otp}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-400 text-white rounded-md px-4 py-2 mb-4 hover:bg-blue-600 ${
              !formik.isValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!formik.isValid}
          >
            Verify OTP
          </button>
        </form>

        <div className="flex justify-center ">
          <p className="text-gray-600 mb-2">
            Didn't receive the OTP?{' '}
            <a href="#" className="text-blue-500">
              Resend OTP
            </a>
          </p>
        </div>

        <div className="flex justify-center ">
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

export default OTP;