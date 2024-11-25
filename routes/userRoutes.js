const express = require("express");
const {
  registerUser,
  loginUser,
  verifyToken,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verifytoken", verifyToken);

module.exports = router;
