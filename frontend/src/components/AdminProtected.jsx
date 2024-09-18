import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function AdminProtected(props) {
  const { AdComponent } = props;

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  const checkUserToken = () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      navigate("/Login"); // If token doesn't exist, navigate to login page
      return;
    }

    const decodedToken = jwtDecode(userToken);
    const userRole = decodedToken.userRole;
    console.log(17, userRole);

    if (userRole === 2) {
      navigate("/Admin"); // If user role is not 1 (not admin), navigate to login page
    }
  };

  useEffect(() => {
    checkUserToken();
  }, []); 
  return (
    <div>
      <AdComponent />
    </div>
  );
}

export default AdminProtected;
