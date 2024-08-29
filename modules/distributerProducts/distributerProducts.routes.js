const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  getDistributorProducts,
  addDistributorProduct,
  deleteDistributorProduct,
  updateDistributorProduct,
} = require("./distributerProducts.controllers");

const router = Router();
router.get("/", validateJWT, getDistributorProducts);
router.post("/", validateJWT, addDistributorProduct);
router.delete("/:uuid", validateJWT, deleteDistributorProduct);
router.patch("/:uuid", validateJWT, updateDistributorProduct);

module.exports = router;
