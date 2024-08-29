const { Lot, Supplier } = require("../../models");
const { randomNumber } = require("../../utils/random_number");
const { errorResponse, successResponse } = require("../../utils/responses");
const findLotByUUID = async (uuid) => {
  try {
    const response = await Lot.findOne({
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
const addLot = async (req, res) => {
  try {
    const { packageSize, stickersCount } = req.body;
    let lotNo = randomNumber();
    let userId = req.user.id;
    const lot = await Lot.create({
      lotNo,
      userId,
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
        userId: req.user.id,
      },
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, response);
  }
};
const deleteLot = async (req, res) => {
  try {
    const { uuid } = req.params;
    const lot = await Lot.findOne({
      where: {
        uuid,
      },
    });
    const response = await lot.destroy();
    successResponse(res, response);
  } catch (error) {}
};

module.exports = { addLot, deleteLot, getLots, findLotByUUID };
