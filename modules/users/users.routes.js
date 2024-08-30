const { Router } = require("express");
const {
  addUser,
  getUsers,
  confirmCode,
  deleteUser,
  sendCode,
  updateUser,
  getMyInfo,
} = require("./users.controllers");
const router = Router();

router.post("/", addUser);
router.post("/confirm/:phone", confirmCode);
router.post("/sendCode/:phone", sendCode);
router.patch("/:uuid", updateUser);
router.get("/:uuid", getMyInfo);
router.get("/", getUsers);
router.delete("/:uuid", deleteUser);

module.exports = router;
