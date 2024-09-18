import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem("userToken");

    // Redirect to the login page
    navigate("/login");
  };

  const handleCancelLogout = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-100  flex items-center justify-center mt-36">
      <div className="bg-white p-8 rounded shadow-md max-w-md">
        <p className="text-xl font-bold mb-4">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handleCancelLogout}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
