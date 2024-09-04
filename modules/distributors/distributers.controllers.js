const { Distributer, User } = require("../../models");
const { randomNumber } = require("../../utils/random_number");
const { errorResponse, successResponse } = require("../../utils/responses");
const findDistributerByUUID = async (uuid) => {
  try {
    const response = await Distributer.findOne({
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
const addDistributer = async (req, res) => {
  try {
    const { packageSize, stickersCount } = req.body;
    let distributerNo = randomNumber();
    let userId = req.user.id;
    const distributer = await Distributer.create({
      distributerNo,
      userId,
      packageSize,
      stickersCount,
    });
    successResponse(res, distributer);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getDistributers = async (req, res) => {
  try {
    const response = await Distributer.findAll({
      where: {
        userId: req.user.id,
      },
      include: [User],
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const deleteDistributer = async (req, res) => {
  try {
    const { uuid } = req.params;
    const distributer = await findDistributerByUUID(uuid);
    const response = await distributer.destroy();
    successResponse(res, response);
  } catch (error) {}
};
const updateDistributer = async (req, res) => {
  try {
    const { uuid } = req.params;
    const distributer = await findDistributerByUUID(uuid);
    const response = await distributer.update({
      ...req.body,
    });
    successResponse(res, response);
  } catch (error) {}
};

module.exports = {
  addDistributer,
  deleteDistributer,
  getDistributers,
  updateDistributer,
  findDistributerByUUID,
};
