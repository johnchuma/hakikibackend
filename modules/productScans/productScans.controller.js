const { ProductScan, Product } = require("../../models");
const { randomNumber } = require("../../utils/random_number");
const { errorResponse, successResponse } = require("../../utils/responses");
const { findProductByUUID } = require("../products/products.controllers");
const findProductScanByUUID = async (uuid) => {
  try {
    const response = await ProductScan.findOne({
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
const addProductScan = async (req, res) => {
  try {
    const { product_uuid } = req.body;
    const userId = req.user.id;
    const product = await findProductByUUID(product_uuid);
    const productscan = await ProductScan.create({
      productId: product.id,
      userId,
    });
    successResponse(res, productscan);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getProductScans = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(req.user.id);
    const response = await ProductScan.findAll({ userId, include: [Product] });
    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};
const deleteProductScan = async (req, res) => {
  try {
    const { uuid } = req.params;
    const productscan = await ProductScan.findOne({
      where: {
        uuid,
      },
    });
    const response = await productscan.destroy();
    successResponse(res, response);
  } catch (error) {}
};

module.exports = {
  addProductScan,
  deleteProductScan,
  getProductScans,
  findProductScanByUUID,
};
