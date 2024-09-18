import React from "react";
import Table from "../components/shared/Table";
import { Link } from "react-router-dom";

const AdminStaff = () => {
  const adminStaffData = [
    {
      Name: "Mohan",
      Role: "Cleaner",
      Contact: "9177567463",
      Email: "Mohansingh@gmail",
      Address: "BTM Layout",
    },
    {
      Name: "Raju",
      Role: "Sweaper",
      Contact: "767756463",
      Email: "Raju@gmail.com",
      Address: "JP Nagar",
    },

    {
      Name: 'Rajesh',
      Role: 'Manager',
      Contact: '9876543210',
      address: "Mumbai",
      email: "rajesh@example.com",
    },
    {
      Name: 'Suresh',
      Role: 'Accountant',
      Contact: '9988776655',
      address: "Bangalore",
      email: "suresh@example.com",
    },
    {
      Name: 'Priya',
      Role: 'Receptionist',
      Contact: '1234567890',
      address: "Chennai",
      email: "priya@example.com",
    },
    {
      Name: 'Amit',
      Role: 'Security Guard',
      Contact: '8765432109',
      address: "Kolkata",
      email: "amit@example.com",
    },
    {
      Name: 'Anita',
      Role: 'Housekeeper',
      Contact: '6758493021',
      address: "Hyderabad",
      email: "anita@example.com",
    },
    {
      Name: 'Sanjay',
      Role: 'Driver',
      Contact: '8899776655',
      address: "Pune",
      email: "sanjay@example.com",
    },
    {
      Name: 'Pooja',
      Role: 'Waiter',
      Contact: '9876543210',
      address: "Ahmedabad",
      email: "pooja@example.com",
    },
    {
      Name: 'Rahul',
      Role: 'Cleaner',
      Contact: '7878787878',
      address: "Jaipur",
      email: "rahul@example.com",
    },
    {
      Name: 'Deepak',
      Role: 'Electrician',
      Contact: '9898989898',
      address: "Chandigarh",
      email: "deepak@example.com",
    },
  ];

  return (
    <>
      <div className="flex justify-end mt-4">
        <Link to="/admin/createAdminStaff">
          <button className="bg-blue-500 text-white px-4 py-2 m-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Create
          </button>
        </Link>
      </div>

      <Table
        data={adminStaffData}
        nameAttribute="Name"
        addressAttribute="Role"
        adminNameAttribute="Contact"
        attribute="Address"
        EmailAttribute="Email"
        showMoreAttributes={true}
        userType="adminStaff" 
      />
    </>
  );
};

export default AdminStaff;