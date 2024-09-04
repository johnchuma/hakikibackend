const { DistributorProduct } = require("../../models");
const { randomNumber } = require("../../utils/random_number");
const { errorResponse, successResponse } = require("../../utils/responses");
const { findBatchByUUID } = require("../batches/batches.controllers");
const { findUserByUUID } = require("../users/users.controllers");

const findDistributorProductByUUID = async (uuid) => {
  try {
    const response = await DistributorProduct.findOne({
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
const addDistributorProduct = async (req, res) => {
  try {
    const { batch_uuid, distributer_uuid, price } = req.body;
    console.log(req.body);
    const user = await findUserByUUID(distributer_uuid);
    const batch = await findBatchByUUID(batch_uuid);
    const distributorproduct = await DistributorProduct.create({
      batchId: batch.id,
      userId: user.id,
      price,
    });
    successResponse(res, distributorproduct);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};
const getDistributorProducts = async (req, res) => {
  try {
    const response = await DistributorProduct.findAll({
      where: {
        userId: req.user.id,
      },
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const deleteDistributorProduct = async (req, res) => {
  try {
    const { uuid } = req.params;
    const distributorproduct = await findDistributorProductByUUID(uuid);
    const response = await distributorproduct.destroy();
    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};
const updateDistributorProduct = async (req, res) => {
  try {
    const { uuid } = req.params;
    const distributorproduct = await findDistributorProductByUUID(uuid);
    const response = await distributorproduct.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};
module.exports = {
  addDistributorProduct,
  getDistributorProducts,
  deleteDistributorProduct,
  findDistributorProductByUUID,
  updateDistributorProduct,
};
