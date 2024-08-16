import express from "express";
import { verifyStudent, verifyToken } from "../middleware/verifyToken.js";

import {
  submitTask,
  viewClassrooms,
  viewTasks,
  viewTaskSubmissionStatus,
} from "../controllers/student.controller.js";

const router = express.Router();

router.get(
  "/students/:studentId/classrooms",
  verifyToken,
  verifyStudent,
  viewClassrooms
);

router.get(
  "/students/:studentId/classrooms/:classroomId/tasks",
  verifyToken,
  verifyStudent,
  viewTasks
);

router.post(
  "/students/:studentId/classrooms/:classroomId/tasks/:taskId",
  verifyToken,
  verifyStudent,
  submitTask
);

router.get(
  "/classrooms/:classroomId/tasks/:taskId/submissions",
  verifyToken,
  verifyStudent,
  viewTaskSubmissionStatus
);

export default router;
