const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  getFarmerProducts,
  addFarmerProduct,
  deleteFarmerProduct,
  updateFarmerProduct,
} = require("./farmerProducts.controllers");

const router = Router();
router.get("/", validateJWT, getFarmerProducts);
router.post("/", validateJWT, addFarmerProduct);
router.delete("/:uuid", validateJWT, deleteFarmerProduct);
router.patch("/:uuid", validateJWT, updateFarmerProduct);

module.exports = router;
