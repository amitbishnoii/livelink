import express from "express";
import { searchUser, updateUser } from "../controllers/userController";

const router = express.Router();

router.post("/updateInfo", updateUser);
router.get("/searchUser", searchUser);

export default router;