import { Classroom } from "../models/classroom.model.js";
import { Student } from "../models/student.model.js";
import { Submission } from "../models/submission.model.js";
import { Task } from "../models/Task.model.js";
import { Teacher } from "../models/teacher.model.js";

export const createClassroom = async (req, res) => {
  try {
    const { classroomName } = req.body;

    const teacherId = req.params.teacherId;

    const classroom = new Classroom({
      name: classroomName,
      teacher: teacherId,
    });

    await classroom.save();

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    teacher.classrooms.push(classroom._id);
    await teacher.save();

    res
      .status(201)
      .json({ classroomId: classroom._id, classroomName: classroom.name });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Error in the classroom creation",
      error: error.message,
    });
  }
};

export const addStudent = async (req, res) => {
  try {
    const { studentId } = req.body;
    const classroom = await Classroom.findById(req.params.classroomId);
    if (!classroom)
      return res.status(404).json({ message: "Classroom not found" });

    classroom.students.push(studentId);
    await classroom.save();

    const student = await Student.findById(studentId);
    student.classrooms.push(classroom._id);
    await student.save();

    res.status(200).json({ message: "Student added successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Error in the Add Student", error: error.message });
  }
};

export const removeStudent = async (req, res) => {
  try {
    const classroomId = req.params.classroomId;
    const studentId = req.params.studentId;
    const classroom = await Classroom.findById(classroomId);

    if (!classroom)
      return res.status(404).json({ message: "Classroom not found" });

    classroom.students.pull(req.params.studentId);
    await classroom.save();

    const student = await Student.findById(studentId);
    student.classrooms.pull(classroom._id);
    await student.save();

    res.json({ message: "Student removed successfully." });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Error in the removing student", error: error.message });
  }
};

export const assignTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      classroom: req.params.classroomId,
    });
    await task.save();

    const classroom = await Classroom.findById(req.params.classroomId);
    classroom.tasks.push(task._id);
    await classroom.save();

    res.status(201).json({
      taskId: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Error in the assigning task", error: error.message });
  }
};

export const viewClassroom = async (req, res) => {
  try {
    const classrooms = await Classroom.find({ teacher: req.userId });
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching classrooms",
      error: error.message,
    });
  }
};

export const editClassroom = async (req, res) => {
  try {
    const { classroomName } = req.body;

    const classroomId = req.params.classroomId;

    const classroom = await Classroom.findByIdAndUpdate(
      classroomId,
      { name: classroomName },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Classroom updated successfully.", classroom });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Error updating classroom", error: error.message });
  }
};

export const deleteClassroom = async (req, res) => {
  try {
    const classroomId = req.params.classroomId;

    await Classroom.findByIdAndDelete(classroomId);
    res.status(200).json({ message: "Classroom deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting classroom", error: error.message });
  }
};

export const viewTaskSubmissions = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const submissions = await Submission.find({ taskId }).populate(
      "student",
      "name"
    );

    const taskSubmissions = submissions.map((s) => ({
      studentId: s.student._id,
      studentName: s.student.name,
      status: s.status,
    }));
    res.status(200).json(taskSubmissions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching submissions", error: error.message });
  }
};
