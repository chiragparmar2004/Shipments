import { Classroom } from "../models/classroom.model.js";
import { Submission } from "../models/submission.model.js";
import { Task } from "../models/Task.model.js";
import { v2 as cloudinary } from "cloudinary";

export const viewClassrooms = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const classrooms = await Classroom.find({ students: studentId });

    const classroomDetails = classrooms.map(({ _id, name }) => ({
      classroomId: _id,
      classroomName: name,
    }));

    res.status(200).json(classroomDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching classrooms", error: error.message });
  }
};

export const viewTasks = async (req, res) => {
  try {
    const classroomId = req.params.classroomId;
    const tasks = await Task.find({ classroom: classroomId });
    const allTasks = tasks.map(({ _id, title, description, dueDate }) => ({
      taskId: _id,
      title,
      description,
      dueDate,
    }));
    res.status(200).json(allTasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

export const submitTask = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Task file is required!" });
    }

    const { taskFile } = req.files;
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);

    if (new Date() > new Date(task.dueDate)) {
      return res
        .status(400)
        .json({ message: "Cannot submit task after the due date." });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      taskFile.tempFilePath,
      { folder: "TASK_SUBMISSIONS" }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      return res
        .status(500)
        .json({ message: "Failed to upload task file to Cloudinary" });
    }

    const fileUrlCloudinary = cloudinaryResponse.secure_url;

    const submission = new Submission({
      student: req.user._id,
      task: req.params.taskId,
      status: "submitted",
      fileUrl: fileUrlCloudinary,
      submittedAt: new Date(),
    });

    await submission.save();
    res
      .status(201)
      .json({ message: "Task submitted successfully.", submission });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting task", error: error.message });
  }
};

export const viewTaskSubmissionStatus = async (req, res) => {
  try {
    const studentId = req.user._id;
    const submission = await Submission.findOne({
      task: req.params.taskId,
      student: studentId,
    });

    if (!submission) {
      return res.status(404).json({ message: "No submission found." });
    }

    const response = {
      studentId: studentId,
      studentName: req.user.name,
      status: submission.status,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching submission status",
      error: error.message,
    });
  }
};
