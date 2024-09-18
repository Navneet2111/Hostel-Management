import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      const userRole = decodedToken.userRole;

      if (userRole === 1) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate("/Login");
      }
    } else {
      setIsLoggedIn(false);
      navigate("/Login");
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);


  return <Component />;
}

export default Protected;
