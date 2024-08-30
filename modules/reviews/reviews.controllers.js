const { Review } = require("../../models");
const { randomNumber } = require("../../utils/random_number");
const { errorResponse, successResponse } = require("../../utils/responses");
const { findProductByUUID } = require("../products/products.controllers");
const findReviewByUUID = async (uuid) => {
  try {
    const response = await Review.findOne({
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
const addReview = async (req, res) => {
  try {
    const { product_uuid, message } = req.body;
    const userId = req.user.id;
    const product = await findProductByUUID(product_uuid);
    const review = await Review.create({
      productId: product.id,
      userId,
      message,
    });
    successResponse(res, review);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getReviews = async (req, res) => {
  try {
    const response = await Review.findAll();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, response);
  }
};
const deleteReview = async (req, res) => {
  try {
    const { uuid } = req.params;
    const review = await Review.findOne({
      where: {
        uuid,
      },
    });
    const response = await review.destroy();
    successResponse(res, response);
  } catch (error) {}
};

module.exports = { addReview, deleteReview, getReviews, findReviewByUUID };
