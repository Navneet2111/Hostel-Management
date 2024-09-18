import React, { useState, useEffect } from "react";
import { inventoryData } from "../lib/constants/InventoryJson";
import { FiEdit } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import NumberDropdown from "../components/NumberDropdown";
import axios from "axios";


function Inventory() {
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    Item: "",
    quantity: "",
    description: "",
  });
  const [changesMade, setChangesMade] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1); // Set default page to 1
  const token = localStorage.getItem("userToken");
  const [requested, setRequested] = useState([])

  useEffect(() => {
    if (editingItem) {
      setEditedItem(editingItem);
    } else {
      setEditedItem({});
    }
  }, [editingItem]);

  useEffect(() => {
    const isChanged = Object.keys(editedItem).some(
      (key) => editedItem[key] !== (editingItem && editingItem[key])
    );
    setChangesMade(isChanged);
  }, [editedItem, editingItem]);

  const openEditPopup = (item) => {
    setEditingItem(item);
  };

  const saveChanges = () => {
    setEditingItem(null);
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  const handleCreate = () => {
    setEditingItem({ Item: "", quantity: "", description: "" }); // Reset editingItem to clear the previous editing state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDropdownSelect = (value) => {
    setSelectedDropdownValue(value); // Set the selected dropdown value
  };

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
          "http://localhost:5000/superAdmin/hostel/show_hostels",
          { options: requested }, // Structure the data object with 'options'
          {
              headers: {
                  Authorization: token,
              },
          }
      )
      .then((response) => {
          //setHostels(response.data.data.data);
          setPaginator(response.data.data.paginator);
      })
      .catch((error) => {
          console.error(error);
      });
}, [selectedPage, selectedDropdownValue, token,requested,paginate]); 

  return (
    <div className="bg-white rounded-lg shadow-xl p-2 z-50  overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)" }}>

    <div className="container mx-auto mt-8">
      <h1 className="text-5xl h-24 font-bold mb-4 text-center bg-slate-200 rounded-lg shadow-lg p-8 mt-4 text-black">
        Inventory
      </h1>

      
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

      <div className="mt-4 flex justify-end"> 
        <NumberDropdown onSelectNumber={handleDropdownSelect} />
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-6">Non-Food Inventory</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {inventoryData.map((item) => (
            <div
              key={item.id}
              className="bg-purple-200 rounded-md p-8 shadow-md relative mb-4"
            >
              <h3 className="text-lg font-semibold">{item.Item}</h3>
              <p className="text-gray-600 mt-2">Quantity: {item.quantity}</p>
              <p className="text-gray-600">Description: {item.description}</p>
              <button
                className="absolute top-0 right-0 bg-transparent border-none text-gray-600 p-2 rounded-md"
                onClick={() => openEditPopup(item)}
              >
                <FiEdit />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Component */}
      {editingItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="p-2 text-2xl font-semibold mb-4 flex item-center justify-center ">
              Edit Inventory Item
            </h2>
            <form>
              <div className="mb-4 ">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2 "
                  htmlFor="name"
                >
                  Item
                </label>
                <input
                  type="text"
                  id="Item"
                  name="Item"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editedItem.Item || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="quantity"
                >
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editedItem.quantity || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editedItem.description || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    !changesMade && "opacity-50 cursor-not-allowed"
                  }`}
                  type="button"
                  onClick={saveChanges}
                  disabled={!changesMade}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

                    

        </div>


      )}

      
    </div>
    </div>
  );
}

export default Inventory;
