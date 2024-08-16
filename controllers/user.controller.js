import { Student } from "../models/student.model.js";
import { Teacher } from "../models/teacher.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAsTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new Teacher({ name, email, password: hashedPassword });

    await teacher.save();

    res.status(201).json({ message: "Teacher registered successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error in the Teacher registration" });
  }
};

export const registerAsStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const studentUser = new Student({ name, email, password: hashedPassword });

    await studentUser.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error in the Student registration" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, accountType } = req.body;

    let user;

    if (accountType === "student") {
      user = await Student.findOne({ email });
      if (!user) return res.status(400).send({ message: "Email not found" });
    } else if (accountType === "teacher") {
      user = await Teacher.findOne({ email });
      if (!user) return res.status(400).send({ message: "Email not found" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).send({ message: "Invalid password or email" });
    }

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
        role: accountType,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: age }).json({
      message: "Login Success",
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error in the Student registration" });
  }
};
