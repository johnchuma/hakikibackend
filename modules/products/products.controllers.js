const { Product } = require("../../models");
const getUrl = require("../../utils/get_url");
const { randomNumber } = require("../../utils/random_number");
const { successResponse, errorResponse } = require("../../utils/responses");
const { sendMessage } = require("../../utils/send_sms");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      manufactureDate,
      expireDate,
      details,
      introduction,
      OID,
      size,
      usageDetails,
      videoLink,
    } = req.body;
    let image;
    if (req.file) {
      image = await getUrl(req);
    }
    const user = req.user;
    console.log(user);
    const response = await Product.create({
      name,
      image,
      manufactureDate,
      expireDate,
      details,
      introduction,
      OID,
      size,
      supplierId: user.Supplier.id,
      usageDetails,
      videoLink,
    });
    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getProduct = async (req, res) => {
  try {
    const {uuid} = req.params;
    const response = await Product.findOne({
        where:{
            uuid
        }
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getProducts = async (req, res) => {
    try {
      const response = await Product.findAll();
      successResponse(res, response);
    } catch (error) {
      errorResponse(res, error);
    }
  };

const getSupplierProducts = async (req, res) => {
  try {
    const user = req.user;
    
    const response = await Product.findAll({
      where: {
        supplierId: user.Supplier.id,
      },
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { uuid } = req.params;
    const product = await Product.findOne({
      where: {
        uuid,
      },
    });
    const response = await product.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { addProduct, deleteProduct, getProducts,getSupplierProducts,getProduct };
