import express from "express"
import { addFriends, registerUser, updateUser, searchUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/searchUser", searchUser);
router.post("/register", registerUser);
router.post("/updateInfo", updateUser);
router.post("/friend/add", addFriends)

export default router;