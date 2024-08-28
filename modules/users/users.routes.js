const { Router } = require("express");
const {
  addUser,
  getUsers,
  confirmCode,
  deleteUser,
  resendCode,
} = require("./users.controllers");
const router = Router();

router.post("/", addUser);
router.post("/confirm/:phone", confirmCode);
router.post("/resendCode/:phone", resendCode);
router.get("/", getUsers);
router.delete("/:uuid", deleteUser);

module.exports = router;
