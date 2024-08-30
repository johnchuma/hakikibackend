const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  getReviews,
  addReview,
  deleteReview,
} = require("./reviews.controllers");

const router = Router();
router.get("/", validateJWT, getReviews);
router.post("/", validateJWT, addReview);
router.delete("/:uuid", validateJWT, deleteReview);

module.exports = router;
