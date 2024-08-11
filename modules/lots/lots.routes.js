const { Router } = require("express");
const { getLots, addLot, deleteLot } = require("./lots.controllers");
const { validateJWT } = require("../../utils/validateJWT");

const router = Router();
router.get("/", validateJWT, getLots);
router.post("/", validateJWT, addLot);
router.delete("/", validateJWT, deleteLot);

module.exports = router;
