const { Router } = require("express");

const { validateJWT } = require("../../utils/validateJWT");
const {
  getDistributers,
  addDistributer,
  deleteDistributer,
  updateDistributer,
} = require("./distributers.controllers");

const router = Router();
router.get("/", validateJWT, getDistributers);
router.post("/", validateJWT, addDistributer);
router.delete("/:uuid", validateJWT, deleteDistributer);
router.patch("/:uuid", validateJWT, updateDistributer);

module.exports = router;
