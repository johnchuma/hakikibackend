const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addProduct,
  deleteProduct,
  getProducts,
  getSupplierProducts,
  getProduct,
  findAllProductInfo,
  checkIfIsGenuine,
  checkProductWithScratchCode,
  updateProduct,
} = require("./products.controllers");
const upload = require("../../utils/upload");
const router = Router();

router.post("/", validateJWT, upload.single("file"), addProduct);
router.get("/", validateJWT, getProducts);
router.get("/supplier", validateJWT, getSupplierProducts);
router.get("/details/:uuid", validateJWT, findAllProductInfo);
router.get("/check/:uuid", validateJWT, checkIfIsGenuine);
router.post("/verify/sms", checkProductWithScratchCode);
router.get("/:uuid", validateJWT, getProduct);
router.patch("/:uuid", validateJWT, updateProduct);
router.delete("/:uuid", deleteProduct);

module.exports = router;
