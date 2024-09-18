// student.jsx
import React from "react";
import Table from "../components/shared/Table";
import { Link } from "react-router-dom";

const Students = () => {
  const students = [
    {
      Name: "Sameer",
      "Bed No": "12",
      Contact: "7677567463",
      Email: "sameersingh@gmail",
      Address: "Adress1",
    },
    {
      Name: "Navneet",
      "Bed No": "22",
      Contact: "917756463",
      Email: "Navneetsingh@gmail",
      Address: "Adress2",
    },


    {
      Name: "Rahul",
      "Bed No": "23",
      Contact: "917756464",
      Email: "rahul@gmail.com",
      Address: "Address3",
    },
    {
      Name: "Aman",
      "Bed No": "24",
      Contact: "917756465",
      Email: "aman@gmail.com",
      Address: "Address4",
    },
    {
      Name: "Sakshi",
      "Bed No": "25",
      Contact: "917756466",
      Email: "sakshi@gmail.com",
      Address: "Address5",
    },
    {
      Name: "Riya",
      "Bed No": "26",
      Contact: "917756467",
      Email: "riya@gmail.com",
      Address: "Address6",
    },
    // {
    //   Name: "Rohan",
    //   "Bed No": "27",
    //   Contact: "917756468",
    //   Email: "rohan@gmail.com",
    //   Address: "Address7",
    // },
    // {
    //   Name: "Priya",
    //   "Bed No": "28",
    //   Contact: "917756469",
    //   Email: "priya@gmail.com",
    //   Address: "Address8",
    // },
    // {
    //   Name: "Sohan",
    //   "Bed No": "29",
    //   Contact: "917756470",
    //   Email: "sohan@gmail.com",
    //   Address: "Address9",
    // },
    // {
    //   Name: "Kritika",
    //   "Bed No": "30",
    //   Contact: "917756471",
    //   Email: "kritika@gmail.com",
    //   Address: "Address10",
    // },
    // {
    //   Name: "Neha",
    //   "Bed No": "31",
    //   Contact: "917756472",
    //   Email: "neha@gmail.com",
    //   Address: "Address11",
    // },
  ];

  return (
    <>
      <div className=" flex justify-end p-4">
        <Link to="/admin/createStudents">
          <button className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Create
          </button>
        </Link>
      </div>

      <Table
        data={students}
        nameAttribute="Name"
        addressAttribute="Bed No"
        attribute="Address"
        adminNameAttribute="Contact"
        EmailAttribute="Email"
      
        showMoreAttributes={false}
        userType="student" 
      />
    </>
  );
};

export default Students;