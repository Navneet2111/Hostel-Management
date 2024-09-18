import React from 'react';
import { MdErrorOutline, MdOutlineMail } from 'react-icons/md';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

function ForgotPass() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      navigate("/otp");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="max-w-lg w-full p-8 bg-white rounded-md shadow-md relative">
        <div className='flex justify-center p-4 text-red-400 '>
          <MdErrorOutline fontSize={45} />
        </div>
        <h1 className="flex text-gray-600 text-3xl font-semibold justify-center mb-6">
          Forgot Password
        </h1>

        <p className="flex justify-center text-gray-500 mb-6">
          Enter your email to reset your password.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6 relative">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <MdOutlineMail fontSize={21} className="absolute top-2 left-3 text-gray-500" />
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border border-gray-300 rounded-md px-10 py-2 pl-14 focus:outline-none focus:border-gray-600"
                placeholder="Enter your email"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-400 text-white rounded-md px-4 py-2 mb-4 hover:bg-blue-600 ${
              !formik.isValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!formik.isValid}
          >
            Reset Password
          </button>
        </form>

        <div className="flex justify-center ">
          <p className="text-gray-600 mb-2">
            Remember your password?{' '}
            <a href="/login" className="text-blue-500">
              Back to login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;