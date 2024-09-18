import { useFormik } from "formik";
import React, { useState } from "react";
import { loginSchema } from "../schema";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false); // State for invalid credentials

  const { errors, touched, values, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => { 
        const { email, password } = values;
        console.log(email, password);
        try {
          const response = await axios.post(
            "http://localhost:5000/superAdmin/auth/login",
            { email, password }
          );
          const token = response.data.data.token;
          localStorage.setItem("userToken", token);

          const decodedToken = jwtDecode(token);

          const userRole = decodedToken.userRole;
          // console.log(userRole);
          if (userRole === 1) {
            navigate("/");
          } else if (userRole === 2) {
            navigate("/Admin");
          } else {
            console.log("Unknown user role:", userRole);

            navigate("/Login");
          }
        } catch (err) {
          console.log("Login failed", err);
          action.resetForm();
        }
      },
    });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-400 text-white">
    <form
      onSubmit={handleSubmit}
      className="shadow-inherit shadow-xl rounded-xl bg-white flex flex-col justify-center items-center max-w-md p-8"
      style={{ width: "400px", height: "500px" }}
    >
      <h2 className="m-6 text-gray-600 text-5xl font-semibold">Login </h2>

      {invalidCredentials && (
        <div className="text-red-700 top-5 text-center mt-2">
          Invalid credentials. Please try again.
        </div>
      )}
   

   <div className="flex flex-col">
          <label className="font-bold mt-4 mx-4 text-black" htmlFor="email">
            Email:
          </label>
          <input
            className="m-3 px-4 text-black border-gray-500 border-2 text-sm font-bold text-left py-2 pr-10"
            type="text"
            placeholder="Email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.email && touched.email ? (
          <p className="font-medium text-red-700 text-xs">{errors.email}</p>
        ) : null}

        <div className="flex flex-col relative">
          <label className="font-bold mt-2 mx-4 text-black" htmlFor="password">
            Password:
          </label>
          <div className="relative">
            <input
              className="m-3 px-4 text-black border-gray-500 border-2 text-sm font-bold text-left py-2 pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/* Eye icon button to toggle password visibility */}
            <span
              className="absolute top-6 right-8 cursor-pointer text-black"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>
        </div>

        {errors.password && touched.email ? (
          <p className="font-medium text-red-700 text-xs">{errors.password}</p>
        ) : null}

        <div className="flex justify-center mt-5">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-bold rounded-full text-sm py-3 px-6 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            Login
          </button>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Forgot your password?{' '}
            <Link to="/forgotPassword" className="text-blue-500">
              Click Here!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
