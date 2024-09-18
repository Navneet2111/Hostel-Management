
import { useNavigate } from 'react-router-dom';
import Form from '../pages/Form';

const CreateStudents = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Form
      label1={"Name"}
      label2={"Bed No"}
      label3={"Contact"}
      onCancel={handleCancel}
    />
  );
}

export default CreateStudents;
