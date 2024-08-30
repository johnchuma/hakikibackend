const { Router } = require("express");
const {
  addUser,
  getUsers,
  confirmCode,
  deleteUser,
  sendCode,
  updateUser,
  getMyInfo,
  getUserInfo,
} = require("./users.controllers");
const { validateJWT } = require("../../utils/validateJWT");
const router = Router();

router.post("/", addUser);
router.post("/confirm/:phone", confirmCode);
router.post("/sendCode/:phone", sendCode);
router.patch("/:uuid", updateUser);
router.get("/me", validateJWT, getMyInfo);
router.get("/:uuid", getUserInfo);
router.get("/", getUsers);
router.delete("/:uuid", deleteUser);

module.exports = router;
