const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  getBatches,
  getBatchProducts,
  addBatch,
  addBatchProduct,
  deleteBatch,
  deleteBatchProduct,
} = require("./batches.controllers");

const router = Router();
router.get("/", validateJWT, getBatches);
router.get("/products/:uuid", validateJWT, getBatchProducts);
router.post("/", validateJWT, addBatch);
router.post("/product/:uuid", validateJWT, addBatchProduct);
router.delete("/", validateJWT, deleteBatch);
router.delete("/product/:uuid", validateJWT, deleteBatchProduct);

module.exports = router;
