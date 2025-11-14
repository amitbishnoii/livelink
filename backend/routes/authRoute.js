import express from "express"
import { addFriends, registerUser, updateUser, searchUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/searchUser", searchUser);
router.post("/register", registerUser);
router.post("/updateInfo", updateUser);
router.post("/friend/add", addFriends);
router.post("/login", loginUser)

export default router;