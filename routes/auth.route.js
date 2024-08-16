import express from "express";
import {
  registerAsStudent,
  registerAsTeacher,
  login,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/registerAsTeacher", registerAsTeacher);
router.post("/registerAsStudent", registerAsStudent);
router.post("/login", login);

export default router;
