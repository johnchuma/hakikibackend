const { Router } = require("express");
const {
  addUser,
  getUsers,
  confirmCode,
  deleteUser,
  sendCode,
} = require("./users.controllers");
const router = Router();

router.post("/", addUser);
router.post("/confirm/:phone", confirmCode);
router.post("/sendCode/:phone", sendCode);
router.get("/", getUsers);
router.delete("/:uuid", deleteUser);

module.exports = router;
