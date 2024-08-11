const { Lot, Supplier } = require("../../models");
const { randomNumber } = require("../../utils/random_number");
const { errorResponse, successResponse } = require("../../utils/responses");

const addLot = async (req, res) => {
  try {
    const { packageSize, stickersCount } = req.body;
    let lotNo = randomNumber();
    let supplierId = req.user.Supplier.id;
    const lot = await Lot.create({
      lotNo,
      supplierId,
      packageSize,
      stickersCount,
    });
    successResponse(res, lot);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getLots = async (req, res) => {
  try {
    const response = await Lot.findAll({
      where: {
        supplierId: req.user.Supplier.id,
      },
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res,response)
  }
};
const deleteLot = async (req, res) => {
  try {
    const { uuid } = req.params();
    const lot = await Lot.findOne({
      where: {
        uuid,
      },
    });
    const response = await lot.destroy();
    successResponse(res, response);
  } catch (error) {}
};

module.exports = { addLot, deleteLot,getLots };
