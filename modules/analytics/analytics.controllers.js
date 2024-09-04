const { Op } = require("sequelize");
const { User, Product, ProductScan } = require("../../models");
const { successResponse, errorResponse } = require("../../utils/responses");
const { startOfDay, endOfDay } = require("date-fns");
const getOverviewStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalUsersToday = await User.count({
      where: {
        createdAt: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });
    const totalProducts = await Product.count();
    const totalProductsToday = await Product.count({
      where: {
        createdAt: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });
    const totalScans = await ProductScan.count();
    const totalScansToday = await ProductScan.count({
      where: {
        createdAt: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });
    const totalFarmers = await User.count({
      where: {
        role: "farmer",
      },
    });
    const totalFarmersToday = await User.count({
      where: {
        [Op.and]: {
          createdAt: {
            [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
          },
          role: "farmer",
        },
      },
    });
    const response = {
      totalUsers,
      totalUsersToday,
      totalScans,
      totalScansToday,
      totalProducts,
      totalProductsToday,
      totalFarmers,
      totalFarmersToday,
    };
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { getOverviewStats };
