const Staff = require("../../../model/staff");
const authConstant = require("../../../constants/authConstant");
const dbService = require("../../../utils/dbService");
const addStaff = async (req, res) => {
  const {
    name,
    userRole,
    hostelId,
    fullAddress,
    city,
    state,
    zipcode,
    country,
    about,
    contactNo,
  } = req.body;
  try {
    let isStaffExist = await Staff.findOne({ where: { contactNo } });
    if (isStaffExist) {
      return res
        .status(409)
        .json({ msg: "User with this phone number already exist." });
    }
    const staff = await Staff.create({
      name,
      userRole,
      hostelId,
      fullAddress,
      city,
      state,
      zipcode,
      country,
      about,
      contactNo,
      addedBy: req.user.id,
      isActive: true,
    });

    if (!staff) {
      return res.recordNotFound();
    }
    return res.status(200).json({
      message: `Staff ${staff.name} has been created successfully`,
      data: staff,
    });
  } catch (error) {
    return res.internalServerError({ data: error.message });
  }
};

const removeStaffFromHostel = async (req, res) => {
  const staffId = req.params.id; 

  try {
    const staff = await Staff.findOne({ where: { id: staffId } });
   

    if (!staff) {
      return res.failure({ msg: "Staff does not exist" });
    }

    const updatedStaff = await staff.update({
      isActive: false,
      updatedBy: req.user.id,
    });

    
    const staffData = {
      id: updatedStaff.id,
      name: updatedStaff.name,
    };

    return res.status(200).json({
      message: "Successfully Removed the Staff",
      data: staffData,
    });
  } catch (error) {
    console.error("Error in removeStaffFromHostel:", error);
    return res.internalServerError({ message: error.message });
  }
};

const findAllStaffs = async (req, res) => {
  let id = req.user.id;
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundUser;
    if (dataToFind && dataToFind.query) {
      query = dataToFind.query;
      query.addedBy = id;
    }
    if (dataToFind && dataToFind.isCountOnly) {
      foundUser = await dbService.count(Staff, query);
      if (!foundUser) {
        return res.recordNotFound();
      }

      foundUser = { totalRecords: foundUser };
      return res.success({  foundUser });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
   
    foundUser = await dbService.paginate(Staff, query, options);
    if (!foundUser) {
      return res.recordNotFound();
    }
    return res.success({
      message: "Resulted Data",
      data:foundUser,
    });
  } catch (error) {
    return res.internalServerError({ data: error.message });
  }
};
const getStaff = async (req, res) => {
  const { id } = req.params; 

  try {
    const staff = await Staff.findByPk(id);

    if (!staff) {
      return res.recordNotFound();
    }

    return res.status().json({ data: staff });
  } catch (error) {
    console.error("Error in getStaff:", error);

    return res.internalServerError({
      message: "Failed to retrieve staff information",
    });
  }
};

const updateStaffDetails = async (req, res) => {
  let dataToUpdate = { ...req.body };
  delete dataToUpdate.addedBy;
  dataToUpdate.updatedBy = req.user.id;
  try {
    dataToUpdate = {
      ...dataToUpdate,
      userRole: authConstant.STAFF_TYPE[dataToUpdate.userRole],
    };
    const staffId = req.params.id;
    let updatedUser = await dbService.update(
      Staff,
      { id: staffId },
      dataToUpdate
    );

    if (!updatedUser) {
      return res.recordNotFound();
    }
    return res.status(200).json({ 
      message: `Successfully Updated the ${updatedUser.name} information `,
      data: updatedUser });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

module.exports = {
  addStaff,
  removeStaffFromHostel,
  findAllStaffs,
  getStaff,
  updateStaffDetails,
};
