import express from "express"
import { registerUser } from "../controllers/authController.js";
import { updateUser } from "../controllers/authController.js";
import { searchUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/searchUser", searchUser);
router.post("/register", registerUser);
router.post("/updateInfo", updateUser);

export default router;