const { Router } = require("express");
const {
  getSuppliers,
  addSupplier,
  deleteSupplier,
  updateSupplier,
} = require("./suppliers.controllers");
const { validateJWT } = require("../../utils/validateJWT");

const router = Router();
router.get("/", validateJWT, getSuppliers);
router.post("/", validateJWT, addSupplier);
router.delete("/:uuid", validateJWT, deleteSupplier);
router.patch("/:uuid", validateJWT, updateSupplier);

module.exports = router;
