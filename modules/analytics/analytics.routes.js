const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const { getOverviewStats } = require("./analytics.controllers");

const router = Router();

router.get("/overview", validateJWT, getOverviewStats);

module.exports = router;
