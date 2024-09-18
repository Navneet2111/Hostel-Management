import React, { useEffect,useState } from "react";
import  axios  from "axios";
import { Link } from 'react-router-dom';  
import Table from './shared/Table';

const Staff = () => {
  const [staffData, setstaffData] = useState([]);
  const token = localStorage.getItem("userToken");
  useEffect(() => {
    fetchStaffData();
  }, []);
  const fetchStaffData = async (e) => {
    try {
      const response = await axios.get(
        'https://dummyjson.com/users',
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setstaffData(response.data.users);
      console.log(staffData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="relative">
          <div className="flex justify-end p-4">
        {/* Create Button */}
        <Link to="/newCreateStaff">
          <button className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Create</button>
        </Link>
      </div>
      <Table
        data={staffData}
        nameAttribute="lastName"
        addressAttribute="gender"
        adminNameAttribute="phone"
        attribute="Address"
        EmailAttribute="email" 
      />
    </div>
  );

};

export default Staff;
