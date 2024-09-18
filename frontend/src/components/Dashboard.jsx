import React, { useState, useEffect } from "react";
import HostelCard from "./Hostelcard";
import { HiOutlineX } from "react-icons/hi";
import axios from "axios";
import ReactPaginate from "react-paginate";
import NumberDropdown from "./NumberDropdown";

const Dashboard = () => {
  const [selectedHostel, setSelectedHostel] = useState();
  const [hostels, setHostels] = useState([]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1); // Set default page to 1
  const token = localStorage.getItem("userToken");
  const [requested, setRequested] = useState([])

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setRequested({ page: selectedPage, paginate: selectedDropdownValue }); // Set requested state with an object
    setSelectedPage(selectedPage); 
    
  };
  console.log(requested);  
  const { page, paginate } = requested; // Destructure 'requested' object
  
console.log(requested);
useEffect(() => {
  axios
      .post(
          "http://localhost:5000/superAdmin/hostel/all",
          { options: requested }, // Structure the data object with 'options'
          {
              headers: {
                  Authorization: token,
              },
          }
      )
      .then((response) => {
          setHostels(response.data.data.data);
          setPaginator(response.data.data.paginator);
      })
      .catch((error) => {
          console.error(error);
      });
}, [selectedPage, selectedDropdownValue, token,requested,paginate]); // Add selectedDropdownValue to the dependency array


  const toggleDetails = (hostel) => {
    setSelectedHostel(selectedHostel === hostel ? null : hostel);
  };

  const handleDropdownSelect = (value) => {
    setSelectedDropdownValue(value); // Set the selected dropdown value
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-2 z-50 overflow-y-auto max-h-screen ">
      <div className="mt-2 flex items-center justify-center h-24 bg-gray-200 rounded-lg shadow-lg">
        <p className="text-3xl font-bold text-gray-800">Hostels</p>
      </div>

      <div className="mt-4 flex justify-end"> 
        <NumberDropdown onSelectNumber={handleDropdownSelect} />
      </div>

      <div className="mt-6 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={25} // You need to set the correct pageCount value
          marginPagesDisplayed={3}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"flex"}
          previousLinkClassName={"p-2 border border-gray-300 rounded-md mr-1"}
          nextLinkClassName={"p-2 border border-gray-300 rounded-md ml-1"}
          pageLinkClassName={"p-2 border border-gray-300 rounded-md"}
          activeClassName={"underline text-blue-500"}
          disabledClassName={"text-gray-400"}
        />
      </div>

      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mb-28 gap-x-5 gap-y-10">
        {selectedHostel && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-gray-800 opacity-75"
              onClick={() => toggleDetails(null)}
            ></div>
            <div className="bg-white rounded-lg shadow-xl p-6 z-50 overflow-y-auto max-h-screen w-full md:w-2/3 lg:w-1/2">
              <div className=" flex items-end justify-end">
                <HiOutlineX fontSize={24} onClick={() => toggleDetails(null)} />
              </div>
              <div className="text-center text-5xl font-bold text-gray-800 mb-4">
                {selectedHostel && selectedHostel.name}
              </div>
              <div className="text-xl text-center text-gray-600 mb-4 flex justify-center">
                <p className=" font-bold mr-2">Address: </p>
                {selectedHostel && selectedHostel.fullAddress}
              </div>
              <div className="flex justify-between text-gray-600">
                <div className="p-4 text-xl font-semibold">Total Beds</div>
                <div className="text-xl font-bold text-center">
                  {selectedHostel && selectedHostel.totalBeds}
                </div>
              </div>
              <div className="flex justify-between text-gray-600">
                <div className="text-xl p-4 font-semibold">Occupied Beds</div>
                <div className="text-xl font-bold text-center">
                  {selectedHostel && selectedHostel.occupiedBeds}
                </div>
              </div>
              <div className="flex justify-between text-gray-600">
                <div className="text-xl p-4 font-semibold">Empty Beds</div>
                <div className="text-xl font-bold text-center">
                  {selectedHostel && selectedHostel.remainingBeds}
                </div>
              </div>

              <div className="flex justify-between text-gray-600">
                <div className="text-xl p-4 font-semibold">Operator ID</div>
                <div className="text-xl font-bold text-center">
                  {selectedHostel && selectedHostel.hostelOperator}
                </div>
              </div>

              <div className="flex justify-between text-gray-600">
                <div className="text-xl p-4 font-semibold">About</div>
                <div className="text-xl font-bold text-center">
                  {selectedHostel && selectedHostel.about}
                </div>
              </div>
            </div>
          </div>
        )}
        {hostels.map((hostel, index) => (
          <HostelCard
            key={hostel.id}
            hostel={hostel}
            toggleDetails={toggleDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
