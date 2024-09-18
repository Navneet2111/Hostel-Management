import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewRegisterForm from './shared/NewRegisterForm';

const labels = {
  field1: 'Hostel Name',
  field2: 'Address',
  total: 'Total Rooms Available',
  field10: 'About',
};

function CreateHostel() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      // Make Axios POST request to your backend endpoint
      const response = await axios.post('http://localhost:5000/superAdmin/hostel/create_hostel', formData);
      console.log('Response from backend:', response.data);

      // Optionally, navigate to another page after successful submission
      navigate(-1);
    } catch (error) {
      // Handle error if Axios request fails
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <NewRegisterForm
      labels={labels}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
}

export default CreateHostel;
