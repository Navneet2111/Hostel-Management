import React, { useEffect, useState } from "react";
import Table from "../components/shared/Table";
import { Link } from "react-router-dom";
import axios from "axios";

const Hostel = () => {
  const [hostels, setHostels] = useState([]);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    axios.post('http://localhost:5000/superAdmin/hostel/all', {}, {
      headers: {
        'Authorization': token
      }
    })
    .then(response => {
      setHostels(response.data.data.data); 
      console.log(18,response.data.data.data)
    })
    .catch(error => {
      console.error(error);
    });
  }, [token]);

  return (
    <>
      <div className="flex justify-end p-4">
        <Link to="/createHostel">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Create</button>
        </Link>
      </div>

      <Table
        data={hostels} 
        nameAttribute="name"
        addressAttribute="fullAddress"
        adminNameAttribute="about"
        EmailAttribute="email"        
        userType="hostel"
      />
    </>
  );
};

export default Hostel;

















