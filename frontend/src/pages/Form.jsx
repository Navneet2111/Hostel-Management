import React, { useState } from "react";

const Form = ({ label1, label2, label3, onSubmit, onCancel }) => {
  const [initialValues, setInitialValues] = useState({});
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [changesMade, setChangesMade] = useState(false);

  const handleInputChange = (fieldName, value) => {
    const updatedValues = { ...initialValues, [fieldName]: value };
    setInitialValues(updatedValues);
    setChangesMade(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ value1, value2, value3 });
    alert("Form submitted successfully!");
    setChangesMade(false);
  };

  const handleFormCancel = () => {
    onCancel();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Add New Entry</h2>
      <form onSubmit={handleFormSubmit} className="flex flex-col">
        <div className="mb-4">
          <label
            htmlFor="attribute1"
            className="block text-sm font-medium text-gray-600"
          >
            {label1}:
          </label>
          <input
            type="text"
            id="attribute1"
            value={value1}
            onChange={(e) => {
              setValue1(e.target.value);
              handleInputChange("value1", e.target.value);
            }}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="attribute2"
            className="block text-sm font-medium text-gray-600"
          >
            {label2}:
          </label>
          <input
            type="text"
            id="attribute2"
            value={value2}
            onChange={(e) => {
              setValue2(e.target.value);
              handleInputChange("value2", e.target.value);
            }}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="attribute3"
            className="block text-sm font-medium text-gray-600"
          >
            {label3}:
          </label>
          <input
            type="text"
            id="attribute3"
            value={value3}
            onChange={(e) => {
              setValue3(e.target.value);
              handleInputChange("value3", e.target.value);
            }}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4 px-2">
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${
              !changesMade && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!changesMade}
          >
            Submit
          </button>

          <button
            type="button"
            onClick={handleFormCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
