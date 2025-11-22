import { getMessage, saveMessage } from "../controllers/messageController.js";
import express from "express"

const router = express.Router()

router.post("/saveMessage", saveMessage)
router.get("/getMessage/:senderID/:recID", getMessage)

export default router