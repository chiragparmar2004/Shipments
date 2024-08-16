# ClassConnect Backend API

ClassConnect is a backend API for a classroom management platform that allows teachers to create and manage classrooms, assign tasks, and handle student enrollment, while students can view their classrooms and tasks.

## Features

- **Teachers**: Create and manage classrooms, add/remove students, assign tasks, and view task submissions.
- **Students**: View enrolled classrooms, view and submit tasks.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chiragparmar2004/Shipments
   cd Shipments
  ```
2 install DEpen
npm install
3

app.use("/api/auth", authRoute);
app.use("/api", teacherRoute);
app.use("/api", studentRoute);

