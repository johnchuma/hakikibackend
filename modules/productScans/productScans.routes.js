const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  getProductScans,
  addProductScan,
  deleteProductScan,
} = require("./productScans.controller");

const router = Router();
router.get("/", validateJWT, getProductScans);
router.post("/", validateJWT, addProductScan);
router.delete("/:uuid", validateJWT, deleteProductScan);

module.exports = router;
