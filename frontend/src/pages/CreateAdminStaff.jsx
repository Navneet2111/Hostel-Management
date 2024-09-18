
import { useNavigate } from 'react-router-dom';
import Form from '../pages/Form';

const CreateAdminStaff = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Form
      label1={"Name"}
      label2={"Role"}
      label3={"Contact"}
      onCancel={handleCancel}
    />
  );
}

export default CreateAdminStaff;
