const { Op } = require("sequelize");
const {
  Product,
  User,
  BatchProduct,
  DistributorProduct,
  Batch,
  Lot,
} = require("../../models");
const getUrl = require("../../utils/get_url");
const {
  randomNumber,
  randomNumberWith12Chars,
} = require("../../utils/random_number");
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
    const product = await Product.findOne({
      where: {
        uuid,
      },
      attributes: {
        exclude: ["qrCode", "UserId", "userId"],
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
    const scratchCode = randomNumberWith12Chars();
    const product = await Product.create({
      name,
      image,
      manufactureDate,
      expireDate,
      details,
      introduction,
      scratchCode,
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
    const response = await findProductByUUID(uuid);

    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const checkIfIsGenuine = async (req, res) => {
  try {
    const { uuid } = req.params;
    const product = await Product.findOne({
      where: {
        [Op.and]: [
          {
            uuid,
          },
          {
            expireDate: {
              [Op.gte]: new Date(),
            },
          },
        ],
      },
    });
    let isGenuine = true;
    if (!product) {
      isGenuine = false;
    } else {
      await product.update({
        isGenuine: false,
      });
    }

    successResponse(res, { isGenuine });
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
const checkProductWithScratchCode = async (req, res) => {
  try {
    const { text, date, from } = req.body;
    console.log(data);
    const scratchCode = text.split(" ")[1];
    const product = await Product.findOne({
      where: {
        [Op.and]: [
          {
            scratchCode,
          },
          {
            expireDate: {
              [Op.gte]: new Date(),
            },
          },
        ],
      },
    });
    let isGenuine = false;
    let phone = addPrefixToPhoneNumber(from);
    let feedback;

    if (product) {
      isGenuine = true;
      feedback = `Habari, bidhaa yako imehakikishwa kuwa ni sahihi.
       Jina la bidhaa: ${product.name}. 
       Tarehe ya kutengenezwa: ${product.manufactureDate}. T
       arehe ya kuharibika: ${product.expireDate}.`;
    } else {
      feedback = `Habari, bidhaa yako ni batili. Tafadhali 
      piga simu kwa namba +255752091764 kwa msaada zaidi.`;
    }
    await sendMessage({
      numbers: [phone],
      message: feedback,
    });
    successResponse(res, { isGenuine, product });
    res.status(200);
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
  checkIfIsGenuine,
  checkProductWithScratchCode,
  getSupplierProducts,
  getProduct,
};
