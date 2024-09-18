import React, { useEffect,useState } from "react";
import  axios  from "axios";
import Table from "./shared/Table";
import { Link } from "react-router-dom";

const Administrator = () => {
  const [adminData, setAdminData] = useState([]);
  const token = localStorage.getItem("userToken");
  console.log(token);
  useEffect(() => { 
    fetchAdminData();
  }, []); 
  const fetchAdminData=async (e) =>{
    try {
      const response=await axios.post('http://localhost:5000/superAdmin/admin/all', 
      {},
      {
        headers: {
            Authorization: token,
        },
        
    }
    )
    //  console.log(response.data.data)
      setAdminData(response.data.data.data);
     // console.log(adminData)
      
    } catch (error) {
      console.error(error);
    }
    };

  return ( 
    <div style={{ height: "calc(100vh - 100px)", overflowY: "auto" }}>
    <div className="flex justify-end p-4">
      <Link to="/createadministrator">
        <button className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Create
        </button>
      </Link>
    </div>
      
      <Table
        data={adminData}
        nameAttribute="name"
        addressAttribute="fullAddress"
        adminNameAttribute="mobileNo"
        EmailAttribute="email" 
        showMoreAttributes={false}
        userType="administrator" 
      />
    </div>
  );
};

export default Administrator;
