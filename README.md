Here's a `README.md` with all the routes detailed out for testing purposes:

```markdown
# ClassConnect Backend API

ClassConnect is a backend API for a classroom management platform that allows teachers to create and manage classrooms, assign tasks, and handle student enrollment, while students can view their classrooms and tasks.

## Features

- **Teachers**: Create and manage classrooms, add/remove students, assign tasks, and view task submissions.
- **Students**: View enrolled classrooms, view and submit tasks.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/classconnect.git
   cd classconnect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
DB_URL="mongodb+srv://chiragp1:YSx14yV8yg04Ry3O@cluster0.4dip71p.mongodb.net/Shipment"

PORT = 5000 

JWT_SECRET_KEY=5T+tywbDw9D26GMKQlzu+iO0wg5CfB5P3wIAA8ElbDkWqX0y75XKIBsa+ii7//gYDjW6/YT0EX4IPYWxCc6YZQ==


CLIENT_URL="http://localhost:5173"

CLOUDINARY_CLOUD_NAME=doirdsrrz

CLOUDINARY_API_KEY=562889281855774
CLOUDINARY_API_SECRET=VLlS3A4P-eWzDyoHJSItxnIREqM

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication Routes

- **Register as a Teacher**
  - **Endpoint**: `POST /api/auth/registerAsTeacher`
  - **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Teacher registered successfully."
    }
    ```

- **Register as a Student**
  - **Endpoint**: `POST /api/auth/registerAsStudent`
  - **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Student registered successfully."
    }
    ```

- **Login**
  - **Endpoint**: `POST /api/auth/login`
  - **Request Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "JWT_TOKEN"
    }
    ```

### Teacher Routes

- **Create Classroom**
  - **Endpoint**: `POST /api/teachers/{teacherId}/classrooms`
  - **Request Body**:
    ```json
    {
      "classroomName": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "classroomId": "string",
      "classroomName": "string"
    }
    ```

- **Add Student to Classroom**
  - **Endpoint**: `POST /api/classrooms/{classroomId}/students`
  - **Request Body**:
    ```json
    {
      "studentId": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Student added successfully."
    }
    ```

- **Remove Student from Classroom**
  - **Endpoint**: `DELETE /api/classrooms/{classroomId}/students/{studentId}`
  - **Response**:
    ```json
    {
      "message": "Student removed successfully."
    }
    ```

- **View Classrooms**
  - **Endpoint**: `GET /api/{teacherId}/classrooms`
  - **Response**:
    ```json
    [
      {
        "classroomId": "string",
        "classroomName": "string"
      }
    ]
    ```

- **Edit Classroom**
  - **Endpoint**: `PUT /api/classrooms/{classroomId}`
  - **Request Body**:
    ```json
    {
      "classroomName": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Classroom updated successfully."
    }
    ```

- **Delete Classroom**
  - **Endpoint**: `DELETE /api/classrooms/{classroomId}`
  - **Response**:
    ```json
    {
      "message": "Classroom deleted successfully."
    }
    ```

- **Assign Task to Classroom**
  - **Endpoint**: `POST /api/classrooms/{classroomId}/tasks`
  - **Request Body**:
    ```json
    {
      "title": "string",
      "description": "string",
      "dueDate": "YYYY-MM-DD"
    }
    ```
  - **Response**:
    ```json
    {
      "taskId": "string",
      "title": "string",
      "description": "string",
      "dueDate": "YYYY-MM-DD"
    }
    ```

- **View Task Submissions**
  - **Endpoint**: `GET /api/classrooms/{classroomId}/tasks/{taskId}/submissions`
  - **Response**:
    ```json
    [
      {
        "studentId": "string",
        "studentName": "string",
        "status": "submitted/pending"
      }
    ]
    ```

### Student Routes

- **View Enrolled Classrooms**
  - **Endpoint**: `GET /api/students/{studentId}/classrooms`
  - **Response**:
    ```json
    [
      {
        "classroomId": "string",
        "classroomName": "string"
      }
    ]
    ```

- **View Tasks in Classroom**
  - **Endpoint**: `GET /api/students/{studentId}/classrooms/{classroomId}/tasks`
  - **Response**:
    ```json
    [
      {
        "taskId": "string",
        "title": "string",
        "description": "string",
        "dueDate": "YYYY-MM-DD"
      }
    ]
    ```

- **Submit Task**
  - **Endpoint**: `POST /api/students/{studentId}/classrooms/{classroomId}/tasks/{taskId}`
  - **Request Body**:
    ```json
    {
      "fileUrl": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Task submitted successfully.",
      "submission": {
        "taskId": "string",
        "status": "submitted",
        "submittedAt": "timestamp"
      }
    }
    ```

- **View Task Submission Status**
  - **Endpoint**: `GET /api/classrooms/{classroomId}/tasks/{taskId}/submissions`
  - **Response**:
    ```json
    [
      {
        "studentId": "string",
        "studentName": "string",
        "status": "submitted/pending"
      }
    ]
    ```

## Data Models

### Teacher
- **Fields**: `name`, `email`, `password`, `classrooms[]`

### Student
- **Fields**: `name`, `email`, `password`, `classrooms[]`

### Classroom
- **Fields**: `name`, `teacher`, `students[]`, `tasks[]`

### Task
- **Fields**: `title`, `description`, `dueDate`, `classroom`

### Submission
- **Fields**: `student`, `task`, `fileUrl`, `status`, `submittedAt`

 
 ```

This `README.md` includes all the routes for testing, as well as the setup and data models. The routes are directly mapped from the code you provided, with the exact paths you can use to test each feature.
