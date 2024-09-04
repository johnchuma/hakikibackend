const { Supplier, User } = require("../../models");
const { randomNumber } = require("../../utils/random_number");
const { errorResponse, successResponse } = require("../../utils/responses");
const findSupplierByUUID = async (uuid) => {
  try {
    const response = await Supplier.findOne({
      where: {
        uuid,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const addSupplier = async (req, res) => {
  try {
    const { packageSize, stickersCount } = req.body;
    let supplierNo = randomNumber();
    let userId = req.user.id;
    const supplier = await Supplier.create({
      supplierNo,
      userId,
      packageSize,
      stickersCount,
    });
    successResponse(res, supplier);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getSuppliers = async (req, res) => {
  try {
    const response = await Supplier.findAll({
      where: {
        userId: req.user.id,
      },
      include: [User],
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const deleteSupplier = async (req, res) => {
  try {
    const { uuid } = req.params;
    const supplier = await findSupplierByUUID(uuid);
    const response = await supplier.destroy();
    successResponse(res, response);
  } catch (error) {}
};
const updateSupplier = async (req, res) => {
  try {
    const { uuid } = req.params;
    const supplier = await findSupplierByUUID(uuid);
    const response = await supplier.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {}
};

module.exports = {
  addSupplier,
  deleteSupplier,
  getSuppliers,
  updateSupplier,
  findSupplierByUUID,
};
