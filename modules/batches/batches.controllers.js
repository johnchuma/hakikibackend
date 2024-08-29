const { Lot, Supplier, BatchProduct, Batch, Product } = require("../../models");
const batch = require("../../models/batch");
const { randomNumber } = require("../../utils/random_number");
const { errorResponse, successResponse } = require("../../utils/responses");
const { findLotByUUID } = require("../lots/lots.controllers");
const { findProductByUUID } = require("../products/products.controllers");

const findBatchByUUID = async (uuid) => {
  try {
    const batch = await Batch.findOne({
      where: {
        uuid,
      },
    });
    return batch;
  } catch (error) {
    throw error;
    console.log(error);
  }
};
const addBatch = async (req, res) => {
  try {
    const { lot_uuid } = req.body;
    let batchNo = randomNumber();
    const lot = await findLotByUUID(lot_uuid);
    const response = await Batch.create({
      batchNo,
      lotId: lot.id,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const addBatchProduct = async (req, res) => {
  try {
    const { product_uuid } = req.body;
    const { uuid } = req.params;
    const product = await findProductByUUID(product_uuid);
    const batch = await findBatchByUUID(uuid);
    const response = await BatchProduct.create({
      productId: product.id,
      batchId: batch.id,
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getBatchProducts = async (req, res) => {
  try {
    const { uuid } = req.params;
    const response = await Batch.findOne({
      where: {
        uuid,
      },
      include: {
        model: BatchProduct,
        include: [Product],
      },
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getBatches = async (req, res) => {
  try {
    const response = await Batch.findAll({
      where: {
        supplierId: req.user.Supplier.id,
      },
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, response);
  }
};

const deleteBatch = async (req, res) => {
  try {
    const { uuid } = req.params;
    const batch = await Batch.findOne({
      where: {
        uuid,
      },
    });
    const response = await batch.destroy();
    successResponse(res, response);
  } catch (error) {}
};
const deleteBatchProduct = async (req, res) => {
  try {
    const { uuid } = req.params;
    const batchProduct = await BatchProduct.findOne({
      where: {
        uuid,
      },
    });
    const response = await batchProduct.destroy();
    successResponse(res, response);
  } catch (error) {}
};

module.exports = {
  addBatch,
  deleteBatch,
  deleteBatchProduct,
  addBatchProduct,
  getBatches,
  findBatchByUUID,
  getBatchProducts,
};
