import React from 'react'
import Form from '../pages/Form'
import { useNavigate } from 'react-router-dom';
function NewCreateStaff() {
  const navigate =useNavigate();
  const handleCancle=()=>{
    navigate(-1);
  }
  
  return (
    <Form
    label1={"Name"}
    label2={"Role"}
    label3={"Contact no."}
    onCancel={handleCancle}
    
    />
  )
}

export default NewCreateStaff  