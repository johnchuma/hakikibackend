const {
  Product,
  User,
  BatchProduct,
  DistributorProduct,
  Batch,
  Lot,
} = require("../../models");
const getUrl = require("../../utils/get_url");
const { randomNumber } = require("../../utils/random_number");
const { successResponse, errorResponse } = require("../../utils/responses");
const { sendMessage } = require("../../utils/send_sms");
const QRCode = require("qrcode");

const findProductByUUID = async (uuid) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid,
      },
    });
    return product;
  } catch (error) {
    throw error;
  }
};
const generateProductQRCode = async (product) => {
  try {
    const code = await QRCode.toDataURL(product.uuid);
    await product.update({
      qrCode: code,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const findAllProductInfo = async (req, res) => {
  try {
    const { uuid } = req.params;
    const product = await Product.findAll({
      where: {
        uuid,
      },
      attributes: {
        exclude: ["qrCode"],
      },
      include: [
        {
          model: User,
          as: "supplier",
        },
        {
          model: BatchProduct,
          include: [
            {
              model: Batch,
              include: [
                Lot,
                {
                  model: DistributorProduct,
                  include: [
                    {
                      model: User,
                      as: "distributor",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    successResponse(res, product);
  } catch (error) {
    errorResponse(res, error);
  }
};
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
    const product = await Product.create({
      name,
      image,
      manufactureDate,
      expireDate,
      details,
      introduction,
      OID,
      size,
      userId: user.id,
      qrCode: "",
      usageDetails,
      videoLink,
    });
    generateProductQRCode(product);
    successResponse(res, product);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};

const getProduct = async (req, res) => {
  try {
    const { uuid } = req.params;
    const response = await Product.findOne({
      where: {
        uuid,
      },
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
        userId: user.id,
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

module.exports = {
  addProduct,
  deleteProduct,
  getProducts,
  findAllProductInfo,
  findProductByUUID,
  getSupplierProducts,
  getProduct,
};
