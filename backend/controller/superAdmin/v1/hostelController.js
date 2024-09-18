const Hostel = require("../../../model/hostel");
const User = require("../../../model/user");
const dbService = require("../../../utils/dbService");
const Bed = require("../../../model/bed")

const createHostel = async (req, res) => {
  const { name, fullAddress, about, totalBeds } = req.body;

  try {

    const existingName = await Hostel.findOne({ where: { name } });
    if (existingName) {
      return res.status(409).json({ error: "Name already exists" });
    }

    const hostel = await dbService.createOne(Hostel,{ 
      name,
      fullAddress,
      about,
      totalBeds,
      hostelOperator: req.user.id,
      addedBy: req.user.id,
      updatedBy: req.user.id,
      isActive: true,
      isDeleted:false
    });

    if (!hostel) {
      return res.failure({ message: "Create hotel failed" });
    }
    
  const beds = [];
  for (let i = 0; i < totalBeds; i++) {
    const bed = await Bed.create({
      hostelId: hostel.id, 
      isAssigned: false 
    });
    beds.push(bed);
  }

    return res.success({ data: hostel});
  } catch (error) {
    console.log(error);
    return res.internalServerError({ message: error.message });
  }
};

const getHostels = async (req, res) => {
  let id = req.user.id;
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundUser;
    if (dataToFind && dataToFind.query) {
      query = dataToFind.query;
      
    }
    if (dataToFind && dataToFind.isCountOnly) {
      foundUser = await dbService.count(Hostel, query);
      if (!foundUser) {
        return res.recordNotFound();
      }

      foundUser = { totalRecords: foundUser };
      return res.success({  foundUser });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options; 
    }
   
    foundUser = await dbService.paginate(Hostel, query, options);
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

const get_hostel = async (req, res) => {
  try {
    let id = req.params.id;
    let foundUser = await Hostel.findOne({ where: { id: id } });
    if (!foundUser) {
      return res.recordNotFound();
    }
    return res.success({ data: foundUser });
  } catch (error) {
    return res.internalServerError();
  }
};

const updateHostel = async (req, res) => {
  try {
    const Id = req.params.id;
    const hostel = await dbService.findOne(Hostel, { id: Id });

    if (!hostel) {
      return res.failure({ error: "Hostel not found for this operator" });
    }

    const { occupiedBeds, ...dataToUpdate } = req.body;

    if (occupiedBeds > hostel.totalBeds) {
      return res.failure({
        error: "Occupied beds can't be more than total beds",
      });
    }

    const updatedHostel = await dbService.update(
      Hostel,
      { id: Id }, // Query
      { ...dataToUpdate, occupiedBeds, updatedBy: req.user.id } // Data to update
    );

    if (!updatedHostel) {
      return res.recordNotFound();
    }

    return res.success({ data: updatedHostel });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};


const deleteHostel = async (req, res) => {
  const id = req.params.id;
  try {
    const hostel = await Hostel.findByPk(id);
    if (!hostel) {
      return res.recordNotFound();
    }
    await hostel.destroy(); // Specify which hostel to delete
    res.status(200).send("The Hostel has been deleted");
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const deActiveHostel = async (req, res) => {
  const Id = req.params.id;
  try {
    const hostel = await dbService.findOne(Hostel, { id: Id });
    if (!hostel) {
      return res.recordNotFound();
    }
    const updatedHostel = await dbService.update(
      Hostel,
      { id: Id }, 
      { isActive: false, updatedBy: req.user.id ,isDeleted : true} 
    );

    if (!updatedHostel) {
      return res.recordNotFound();
    }

    return res.success({ data: updatedHostel });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const findAllAdmin = async (req, res) => {
  let id = req.user.id;
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundUser;
    if (dataToFind && dataToFind.query) {
      query = dataToFind.query;
      query.addedBy = id;
      query.userRole = 2
    }
    if (dataToFind && dataToFind.isCountOnly) {
      foundUser = await dbService.count(User, query);
      if (!foundUser) {
        return res.recordNotFound();
      }

      foundUser = { totalRecords: foundUser };
      return res.success({  foundUser });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }

    foundUser = await dbService.paginate(User, query, options);
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

const oneAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const hostelInfo = await Hostel.findAll({ where: { hostelOperator: id } });

    if (!hostelInfo) {
      return res.recordNotFound();
    }

    const admin = await User.findByPk(id);

    if (!admin) {
      return res.recordNotFound();
    }
    const responseData = {
      admin: admin,
      hostel: hostelInfo,
    };
    return res.success(responseData);
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const removeAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    const hostel = await Hostel.findOne({ where: { id: id } });
  

    const operator = await User.findOne({ where: { userRole: 1 } });
    if (!operator || operator.userRole != 1) {
      return res.status(403).json("Cant Remove");
    }

    if (!hostel) {
      return res.status(404).json({ error: "Hostel not found" });
    }

    const newHostelOperatorId = operator.userRole;

    hostel.hostelOperator = newHostelOperatorId;

    await hostel.save();

    res.success({ message: "Hostel updated successfully", hostel });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

module.exports = {
  createHostel,
  getHostels,
  updateHostel,
  deleteHostel,
  findAllAdmin,
  oneAdmin,
  removeAdmin,
  get_hostel,
  deActiveHostel,
};
