const Hostel = require("../../../model/hostel");
const User = require("../../../model/user");
const Staff = require("../../../model/staff");
const dbService = require("../../../utils/dbService");

const getHostels = async (req, res) => {
  let id = req.user.id;
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundUser;
    if (dataToFind && dataToFind.query) {
      query = dataToFind.query;
      query.addedBy = id;
      isActive = true;
      isDeleted =false;
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

    // Updating the hostel object
    const updatedHostel = await dbService.update(
      Hostel,
      { id: Id },
      { ...dataToUpdate, occupiedBeds, updatedBy: req.user.id }
    );

    if (!updatedHostel) {
      return res.recordNotFound();
    }
    const hostelData = {
      id: updatedHostel.id,
      name: updatedHostel.name,
    };

    return res.status(200).json({
      message: "Successfully Updated the Hostel",
      data: hostelData,
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

module.exports = {
  getHostels,
  updateHostel,
};
