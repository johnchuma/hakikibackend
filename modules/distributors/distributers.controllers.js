const { Distributor, Supplier, User } = require("../../models");
const { randomNumber } = require("../../utils/random_number");
const { errorResponse, successResponse } = require("../../utils/responses");
const findDistributorByUUID = async (uuid) => {
  try {
    const response = await Distributor.findOne({
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
const addDistributor = async (req, res) => {
  try {
    const { packageSize, stickersCount } = req.body;
    let distributorNo = randomNumber();
    let userId = req.user.id;
    const distributor = await Distributor.create({
      distributorNo,
      userId,
      packageSize,
      stickersCount,
    });
    successResponse(res, distributor);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getDistributors = async (req, res) => {
  try {
    const response = await Distributor.findAll({
      where: {
        userId: req.user.id,
      },
      include: [User],
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, response);
  }
};
const deleteDistributor = async (req, res) => {
  try {
    const { uuid } = req.params;
    const distributor = await findDistributorByUUID(uuid);
    const response = await distributor.destroy();
    successResponse(res, response);
  } catch (error) {}
};
const updateDistributor = async (req, res) => {
  try {
    const { uuid } = req.params;
    const distributor = await findDistributorByUUID(uuid);
    const response = await distributor.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {}
};

module.exports = {
  addDistributor,
  deleteDistributor,
  getDistributors,
  updateDistributor,
  findDistributorByUUID,
};
