import React, { useState } from "react";
import { HiPencilAlt, HiTrash, HiOutlineX } from "react-icons/hi";


const Table = ({
  data,
  nameAttribute,
  addressAttribute,
  adminNameAttribute, 
  attribute,
  EmailAttribute,
  showMoreAttributes, 
  userType,
}) => {
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    address: "",
    adminName: "",
  });
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);

  const openPopup = (index) => {
    setSelectedItem(index);
    setShowDeleteModal(true);
  };

  const openEditForm = (index) => {
    const item = data[index];
    setEditFormData({
      name: item[nameAttribute],
      address: item[addressAttribute],
      adminName: item[adminNameAttribute],
    });
    setSelectedItem(index);
    setShowEditForm(true);
  };

  const openMoreDetails = (itemDetails) => {
    setSelectedItemDetails(itemDetails);
    setShowMoreDetails(true);
  };

  const closePopup = () => {
    setSelectedItem(null);
    setShowDeleteModal(false);
    setShowEditForm(false);
    setShowMoreDetails(false);
    setSelectedItemDetails(null);
  };

  const handleEdit = () => {
    // Handle edit logic here
    closePopup(); 
  };

  const handleRemove = (index) => {
    const newData = [...data]; // Create a copy of the data array
    newData.splice(index, 1); // Remove the selected item from the copy
    setData(newData); // Update the state with the new array
    closePopup(); // Close the delete modal after handling the remove
    // Handle remove logic here
    closePopup(); 
  };

  const isDataChanged = () => {
    const item = data[selectedItem];
    return (
      editFormData.name !== item[nameAttribute] ||
      editFormData.address !== item[addressAttribute] ||
      editFormData.adminName !== item[adminNameAttribute]
      // Add more conditions if we have additional fields to edit
    );
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="relative">
      {/* Table Section */}
      <div className="container table-fixed mx-auto mt-8 relative z-10">
        <table className="min-w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-purple-300">
              <th className="px-6 py-3 text-left text-lg font-semibold text-black-700">
                {nameAttribute}
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-black-700">
                {addressAttribute}
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold text-black-700">
                {adminNameAttribute}
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, index) => (
              <tr
                key={index}
                className="transition-all hover:bg-gray-200 hover:shadow-md hover:scale-103"
              >
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800">
                  {data[nameAttribute]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800">
                  {data[addressAttribute]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800">
                  {data[adminNameAttribute]}
                </td>
                <td className="py-4">
                  {/* Action Buttons */}
                  <div className="flex space-x-4 ">
                    <button
                      className="text-blue-700 hover:text-blue-900"
                      onClick={() => openEditForm(index)}
                    >
                      <HiPencilAlt fontSize={20} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => openPopup(index)}
                    >
                      <HiTrash fontSize={20} />
                    </button>
                    <div className="">
                      <button
                        className="text-gray-700 hover:text-blue-800 font-bold text-blue-400"
                        onClick={() => openMoreDetails(data)}
                      >
                        Show More
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     {/* pagination */}
     <div className="flex justify-center mt-4">
      {data.length > itemsPerPage && (
        <ul className="flex space-x-2">
          {/* Previous Button */}
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              className={`px-3 py-1 rounded-md hover:bg-gray-300 ${
                currentPage === 1 ? "bg-gray-400 text-white" : "bg-white text-gray-700"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {/* Page Numbers */}
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
            (item, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md hover:bg-gray-300 ${
                    currentPage === index + 1 ? "bg-gray-400 text-white" : "bg-white text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}

          {/* Next Button */}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              className={`px-3 py-1 rounded-md hover:bg-gray-300 ${
                currentPage === Math.ceil(data.length / itemsPerPage)
                  ? "bg-gray-400 text-white"
                  : "bg-white text-gray-700"
              }`}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            >
              Next
            </button>
          </li>
        </ul>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center z-20">
          <div className="bg-white p-4 rounded-md">
            <p className="mb-4">Are you sure you want to delete this?</p>
            <div className="flex justify-end  space-x-4 ">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                onClick={() => handleRemove(index)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={closePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Edit Form */}
      {showEditForm && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center z-20">
          <div className="bg-gray-100 p-6 rounded-md w-[500px]">
            <p className="mb-4 font-bold flex items-center justify-center py-2 shadow-lg bg-gray-200">
              Edit Information
            </p>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-gray-700"
                >
                  {nameAttribute}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-bold text-gray-700"
                >
                  {addressAttribute}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={editFormData.address}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      address: e.target.value,
                    })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="adminName"
                  className="block text-sm font-bold text-gray-700"
                >
                  {adminNameAttribute}
                </label>
                <input
                  type="text"
                  id="adminName"
                  name="adminName"
                  value={editFormData.adminName}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      adminName: e.target.value,
                    })
                  }
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="flex justify-end mt-6 ">
                <button
                  type="button"
                  className={`bg-blue-500 text-white px-4 py-2 m-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${
                    isDataChanged() ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={handleEdit}
                  disabled={!isDataChanged()}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 m-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                  onClick={closePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* More Details Modal */}
      {showMoreDetails && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center z-20"
          onClick={closePopup}
        >
          <div className="bg-white p-4 rounded-md shadow-lg w-[600px]">
            <div className="flex items-end justify-end text-red-500">
              <HiOutlineX
                fontSize={24}
                onClick={() => setShowMoreDetails(false)}
              />
            </div>
            <p className="mb-4 text-center font-bold text-xl">More Details:</p>
            <div className="grid grid-cols-2 gap-2">
              <p className="p-2 font-semibold">Name:</p>
              <p className="p-2">{selectedItemDetails[nameAttribute]}</p>
              <p className="p-2 font-semibold">
                {userType === "student"
                  ? "Bed No"
                  : userType === "hostel"
                  ? "Address"
                  : userType === "administrator"
                  ? "District"
                  : "Role"}
                :
              </p>
              <p className="p-2">{selectedItemDetails[addressAttribute]}</p>
              <p className="p-2 font-semibold">About:</p>
              <p className="p-2">{selectedItemDetails[adminNameAttribute]}</p>
              {showMoreAttributes && (
                <>
                  <p className="p-2 font-semibold">Address:</p>
                  <p className="p-2">{selectedItemDetails[attribute]}</p>
                </>
              )}
              <p className="p-2 font-semibold">Email:</p>
              <p className="p-2">{selectedItemDetails[EmailAttribute]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
