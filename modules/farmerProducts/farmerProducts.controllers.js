const { FarmerProduct, Supplier } = require("../../models");
const { randomNumber } = require("../../utils/random_number");
const { errorResponse, successResponse } = require("../../utils/responses");
const { findProductByUUID } = require("../products/products.controllers");
const { findUserByUUID } = require("../users/users.controllers");

const findFarmerProductByUUID = async (uuid) => {
  try {
    const response = await FarmerProduct.findOne({
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
const addFarmerProduct = async (req, res) => {
  try {
    const { farmer_uuid, product_uuid } = req.body;
    const user = await findUserByUUID(farmer_uuid);
    const product = await findProductByUUID(product_uuid);
    const farmerproduct = await FarmerProduct.create({
      productId: product.id,
      userId: user.id,
    });
    successResponse(res, farmerproduct);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getFarmerProducts = async (req, res) => {
  try {
    const response = await FarmerProduct.findAll({
      where: {
        userId: req.user.id,
      },
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, response);
  }
};

const deleteFarmerProduct = async (req, res) => {
  try {
    const { uuid } = req.params;
    const farmerproduct = await findFarmerProductByUUID(uuid);
    const response = await farmerproduct.destroy();
    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const updateFarmerProduct = async (req, res) => {
  try {
    const { uuid } = req.params;
    const farmerproduct = await findFarmerProductByUUID(uuid);
    const response = await farmerproduct.update({ ...req.body });
    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

module.exports = {
  addFarmerProduct,
  getFarmerProducts,
  deleteFarmerProduct,
  findFarmerProductByUUID,
  updateFarmerProduct,
};
