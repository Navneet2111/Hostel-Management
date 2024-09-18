import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import DashBoard from "./components/Dashboard";
import Login from "./pages/Login";
import Hostel from "./components/Hostel";
import Administrator from "./components/Administrator";
import Staff from "./components/Staff";
import Setting from "./pages/Setting";
import CreateHostel from "./components/CreateHostel";
import NewCreateStaff from "./components/NewCreateStaff";
import CreateAdministrator from "./components/CreateAdministrator";
import AdminLayout from "./components/shared/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStaff from "./pages/AdminStaff";
import AdminSetting from "./pages/AdminSetting";
import Students from "./pages/Students";
import Inventory from "./pages/Inventory";
import Protected from "./components/Protected";
import Form from "./pages/Form";
import AdminProtected from "./components/AdminProtected";
import Logout from "./pages/Logout";
import AdminLogout from "./pages/AdminLogout";
import CreateStudents from './pages/CreateStudents';
import CreateAdminStaff from './pages/CreateAdminStaff';
import ForgotPass from "./components/shared/ForgotPass";
import OTP from "./components/OTP";
import ConformPassword from "./components/shared/ConformPassword";
import NewRegisterForm from "./components/shared/NewRegisterForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected Component={Layout} />}>
          <Route index element={<DashBoard />} />
          <Route path="/hostel" element={<Hostel />} />
          <Route path="/administrator" element={<Administrator />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/Form" element={<Form />} />        
          <Route path="/NewRegisterForm" element={<NewRegisterForm />} />
          <Route path="/createHostel" element={<CreateHostel />} />
          <Route path="/newCreateStaff" element={<NewCreateStaff />} />
          <Route
            path="/createadministrator"
            element={<CreateAdministrator />}
          />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route
          path="/admin"
          element={<AdminProtected AdComponent={AdminLayout} />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="adminstaff" element={<AdminStaff />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="adminsetting" element={<AdminSetting />} />
          <Route path="students" element={<Students />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="/admin/createStudents" element ={<CreateStudents/>}/>
          <Route path="/admin/createAdminStaff"element={<CreateAdminStaff/>}/>

          <Route path="adminlogout" element={<AdminLogout />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPass />} />
        <Route path="/otp" element={<OTP/>} />
        <Route path="/confirmPassword" element={<ConformPassword/>} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
