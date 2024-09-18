import React, { useState } from 'react';

const StaffTable = ({ staffData }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <h2>Staff</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>User Role</th>
            <th>Hostel ID</th>
            <th>Contact</th>
            <th>Show More</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff, index) => (
            <tr key={index}>
              <td>{staff.name}</td>
              <td>{staff.userRole}</td>
              <td>{staff.hostelId}</td>
              <td>{staff.contactNo}</td>
              <td>
                <button onClick={toggleDetails}>Show More</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDetails && (
        <div>
          <h3>Additional Details</h3>
          <table>
            <tbody>
              {staffData.map((staff, index) => (
                <tr key={index}>
                  <td colSpan="5">
                    <p>Full Address: {staff.fullAddress}</p>
                    <p>City: {staff.city}</p>
                    <p>State: {staff.state}</p>
                    <p>Zipcode: {staff.zipcode}</p>
                    <p>Country: {staff.country}</p>
                    <p>About: {staff.about}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StaffTable;