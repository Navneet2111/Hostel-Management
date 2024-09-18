import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewRegisterForm from './shared/NewRegisterForm';

const labels = {
  field1: 'Name',
  field2: 'Address',
  field3: 'Email',
  field4: 'Password',
  field5: 'Contact Number',
  field6: 'Country',
  field7: 'State',
  field8: 'City',
  field9: 'Zip Code',
  field10: 'About', 
};

function CreateAdministrator() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <NewRegisterForm
      labels={labels}
      onCancel={handleCancel}
      showDropdownButton={true} 
    />
  
);
}

export default CreateAdministrator;
