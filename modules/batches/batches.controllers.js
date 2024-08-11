const { Lot, Supplier, BatchProduct, Batch } = require("../../models");
const batch = require("../../models/batch");
const { randomNumber } = require("../../utils/random_number");
const { errorResponse, successResponse } = require("../../utils/responses");

const addBatch = async (req, res) => {
  try {
    const { lot_uuid } = req.body;
    let batchNo = randomNumber();
    const lot = await Lot.findOne({
      where: {
        uuid: lot_uuid,
      },
    });

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
    const uuid = req.params();
    const product = await Product.findOne({
      where: {
        uuid: product_uuid,
      },
    });
    const batch = await Batch.findOne({
      where: {
        uuid,
      },
    });
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
    const {uuid} = req.params()
    const response = await Batch.findOne({
      where: {
        uuid
      },
      include:{
        model:BatchProduct,
        include:[Product]
      }
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, response);
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
    const { uuid } = req.params();
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
      const { uuid } = req.params();
      const batchProduct = await BatchProduct.findOne({
        where: {
          uuid
        },
      });
      const response = await batchProduct.destroy();
      successResponse(res, response);
    } catch (error) {}
  };

module.exports = { addBatch,deleteBatch,deleteBatchProduct,addBatchProduct,getBatches,getBatchProducts};
