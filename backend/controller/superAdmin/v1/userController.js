const USER = require("../../../model/user");
const userSchemaKey = require("../../../utils/validation/userValidation");
const validation = require("../../../utils/validateRequest");
const dbService = require("../../../utils/dbService");
const authConstant = require("../../../constants/authConstant");
const { checkUniqueFieldsInDatabase } = require("../../../utils/common");
const { generateToken } = require("../../../services/auth");
const moment = require("moment");

/**
 * @description : create record of User in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created User. {status, message, data}
 */

const registerUser = async (req, res) => {
  try {
    let dataToCreate = { ...(req.body || {}) };
    let validateUserRequest = validation.validateParamsWithJoi(
      dataToCreate,
      userSchemaKey.schemaKeys
    );



    if (!validateUserRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateUserRequest.message}`,
      });
    }
    let checkUniqueFields = await checkUniqueFieldsInDatabase(
      USER,
      ["email", "mobileNo"],
      dataToCreate,
      "REGISTER"
    );
    if (checkUniqueFields.isDuplicate) {
      return res.validationError({
        message: `${checkUniqueFields.value} already exists.Unique ${checkUniqueFields.field} are allowed.`,
      });
    }
  
    dataToCreate = {
      ...dataToCreate,
      userRole: authConstant.USER_TYPES[dataToCreate.userRole],
      addedBy: req.user.id,
      updatedBy: req.user.id,
    };

    let createdUser = await dbService.createOne(USER, dataToCreate);
    if (!createdUser) {
      return res.failure({ message: "Create user failed" });
    }
    const { id, isActive } = createdUser;
    if (isActive) {
      if (createdUser.userRole == 1) {
        var roles = {
          id: createdUser.userRole,
          name: "Superadmin",
          role: "SUPER_ADMIN",
        };
      } else if (createdUser.userRole == 2) {
        var roles = {
          id: createdUser.userRole,
          name: "Admin",
          role: "ADMIN",
        };
      } else if (createdUser.userRole == 3) {
        var roles = {
          id: createdUser.userRole,
          name: "Staff",
          role: "STAFF",
        };
      }

      let userToReturn = {
        name: createdUser.dataValues.name,
        email: createdUser.dataValues.email,
        mobileNumber: createdUser.dataValues.mobileNo,
        roles,
      };
      return res
        .status(200)
        .json({ message: "User Created Successfully", data: userToReturn });
    }
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const findAllUser = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundUser;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      userSchemaKey.findFilterKeys
      // user.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }

    if (dataToFind && dataToFind.query) {
      query = dataToFind.query;
    }

    query.userRole = { $eq: 2 };

    if (dataToFind && dataToFind.isCountOnly) {
      foundUser = await dbService.count(user, query);
      if (!foundUser) {
        return res.recordNotFound();
      }
      foundUser = { totalRecords: foundUser };
      return res.success({ data: foundUser });
    }

    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }

    if (dataToFind && dataToFind.customSearch) {
      query["$or"] = [
        {
          name: {
            $iLike: `%${dataToFind.customSearch}%`,
          },
        },
      ];
    }

    options.include = [
      {
        model: userCredentials,
        required: true,
        attributes: ["email", "mobileNo"],
      },
    ];

    foundUser = await dbService.paginate(user, query, options);
    if (!foundUser) {
      return res.recordNotFound();
    }
    return res.success({ data: foundUser });
  } catch (error) {
    console.log(error);
    return res.internalServerError({ data: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    let id = req.params.id;
    let options = {
      include: [
        {
          model: userSettings,
          required: false,
        },
        {
          model: userCredentials,
          required: true,
        },
        {
          model: userActivity,
          required: false,
        },
      ],
    };
    let foundUser = await dbService.findOne(user, { id: id }, options);

    if (!foundUser) {
      return res.recordNotFound();
    }
    return res.success({ data: foundUser });
  } catch (error) {
    return res.internalServerError();
  }
};

const partialUpdateUser = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      userSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({
        message: `Invalid values in parameters, ${validateRequest.message}`,
      });
    }

    let checkUniqueFields = await checkUniqueFieldsInDatabase(
      userCredentials,
      ["email", "mobileNo"],
      dataToUpdate,
      "UPDATE",
      { userId: { $ne: req.params.id } }
    );
    if (checkUniqueFields.isDuplicate) {
      return res.validationError({
        message: `${checkUniqueFields.value} already exists.Unique ${checkUniqueFields.field} are allowed.`,
      });
    }

    let query = {};
    query = {
      id: {
        $eq: req.params.id,
      },
    };
    dataToUpdate = {
      ...dataToUpdate,
      userRole: authConstant.USER_TYPES[dataToUpdate.userRole],
    };
    let updatedUser = await dbService.update(user, query, dataToUpdate);

    if (!dataToUpdate.password) {
      delete dataToUpdate.password;
    }
    await dbService.update(
      userCredentials,
      { userId: req.params.id },
      dataToUpdate
    );
    if (!updatedUser) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedUser[0] });
  } catch (error) {
    console.log(error);

    return res.internalServerError({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const foundUser = await dbService.findOne(user, {
      id: req.params.id,
    });
    if (!foundUser) {
      return res.recordNotFound();
    }
    await dbService.destroy(userAuthSettings, {
      userId: foundUser.id,
    });
    await dbService.destroy(userCredentials, {
      userId: foundUser.id,
    });

    const deletedUser = await dbService.update(
      user,
      { id: foundUser.id },
      { isDeleted: true, updatedBy: req.user.id }
    );
    if (!deletedUser) {
      return res.recordNotFound();
    }
    return res.success({
      data: deletedUser,
    });
  } catch (error) {
    return res.internalServerError();
  }
};

const resetPassword = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body };
    dataToUpdate.updatedBy = req.user.id;

    let updatedUser = await dbService.findOne(user, { id: req.params.id });
    if (!updatedUser) {
      return res.recordNotFound();
    }

    if (!dataToUpdate.password) {
      return res.recordNotFound();
    }

    await dbService.update(
      userCredentials,
      { userId: req.params.id },
      { password: dataToUpdate.password }
    );
    return res.success({ data: updatedUser });
  } catch (error) {
    console.log(error);

    return res.internalServerError({ message: error.message });
  }
};

const logOffUser = async (req, res) => {
  try {
    const foundUser = await dbService.findOne(user, {
      id: req.params.id,
    });
    if (!foundUser) {
      return res.recordNotFound();
    }

    const updatedUser = await dbService.update(
      user,
      { id: req.params.id },
      { loggedOff: true, lastActivityTime: new Date() }
    );
    if (!updatedUser) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedUser });
  } catch (error) {
    console.log(error);

    return res.internalServerError({ message: error.message });
  }
};

const loginToAccount = async (req, res) => {
  try {
    const currentUser = await dbService.findOne(user, {
      id: req.user.id,
    });

    if (!currentUser || currentUser?.userRole !== 1) {
      return res.recordNotFound();
    }

    const userId = await dbService.findOne(user, {
      id: req.params.id,
    });
    if (!userId) {
      return res.recordNotFound();
    }

    await dbService.update(user, { id: req.params.id }, { loggedOff: false });

    const userRoles = {
      id: userId.userRole,
      name: userId.userRole === 1 ? "admin" : "operator",
      role: userId.userRole === 1 ? "ADMIN" : "OPERATOR",
    };
    const SECRET =
      userId.userRole === 1
        ? authConstant.JWT.ADMIN_SECRET
        : authConstant.JWT.OPERATOR_SECRET;
    const userData = userId.toJSON();
    const accessToken = await generateToken(userData, SECRET);
    await trackLogin(req, userId);
    return res.success({ data: { accessToken, userRoles, userId } });
  } catch (error) {
    console.log(error);
    return res.internalServerError({ message: error.message });
  }
};

module.exports = {
  registerUser,
  findAllUser,
  getUser,
  partialUpdateUser,
  deleteUser,
  resetPassword,
  logOffUser,
  loginToAccount,
};
