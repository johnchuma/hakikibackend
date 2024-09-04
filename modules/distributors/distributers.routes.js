const { Router } = require("express");

const { validateJWT } = require("../../utils/validateJWT");
const {
  getDistributors,
  addDistributor,
  deleteDistributor,
  updateDistributor,
} = require("./distributers.controllers");

const router = Router();
router.get("/", validateJWT, getDistributors);
router.post("/", validateJWT, addDistributor);
router.delete("/:uuid", validateJWT, deleteDistributor);
router.patch("/:uuid", validateJWT, updateDistributor);

module.exports = router;
