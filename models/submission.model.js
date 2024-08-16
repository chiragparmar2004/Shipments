import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  status: {
    type: String,
    enum: ["submitted", "pending"],
    default: "pending",
  },
  fileUrl: String,
  submittedAt: Date,
});

export const Submission = mongoose.model("Submission", submissionSchema);
