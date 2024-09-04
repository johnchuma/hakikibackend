const { Op } = require("sequelize");
const { User, Product, ProductScan } = require("../../models");

const getOverviewStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalUsersToday = await User.count({
      where: {
        createdAt: {
          [Op.eq]: Date.now(),
        },
      },
    });
    const totalProducts = await Product.count();
    const totalProductsToday = await Product.count({
      where: {
        createdAt: {
          [Op.eq]: Date.now(),
        },
      },
    });
    const totalScans = await ProductScan.count();
    const totalScansToday = await ProductScan.count({
      where: {
        createdAt: {
          [Op.eq]: Date.now(),
        },
      },
    });
    const totalFarmers = await User.findAll({
      where: {
        role: "farmer",
      },
    });
    const totalFarmersToday = await User.count({
      where: {
        [Op.and]: {
          createdAt: {
            [Op.eq]: Date.now(),
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
