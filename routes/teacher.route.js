import express from "express";
import {
  addStudent,
  createClassroom,
  deleteClassroom,
  editClassroom,
  removeStudent,
  viewClassroom,
  viewTaskSubmissions,
} from "../controllers/teacher.controller.js";
import { verifyTeacher, verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post(
  "/teachers/:teacherId/classrooms",
  verifyToken,
  verifyTeacher,
  createClassroom
);

router.post(
  "/classrooms/:classroomId/students",
  verifyToken,
  verifyTeacher,
  addStudent
);

router.delete(
  "/classrooms/:classroomId/students/:studentId",
  verifyToken,
  verifyTeacher,
  removeStudent
);

router.get("/:teacherId/classrooms", verifyToken, verifyTeacher, viewClassroom);

// Edit Classroom
router.put(
  "/classrooms/:classroomId",
  verifyToken,
  verifyTeacher,
  editClassroom
);

// Delete Classroom
router.delete(
  "/classrooms/:classroomId",
  verifyToken,
  verifyTeacher,
  deleteClassroom
);

// View Task Submission Status
router.get(
  "/classrooms/:classroomId/tasks/:taskId/submissions",
  verifyToken,
  verifyTeacher,
  viewTaskSubmissions
);

export default router;
