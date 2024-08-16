import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader ? authHeader.split(" ")[1] : req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated" });

  const verifiedUser = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY,
    async (err, payload) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Invalid Token" });
      }
      req.userId = payload.id;
      req.user = payload;
      console.log(payload);
      next();
    }
  );
};

// export cox

export const verifyTeacher = (req, res, next) => {
  console.log("here", req.user.role);
  if (req.user.role !== "teacher")
    return res.status(403).json({ message: "Forbidden" });
  next();
};

export const verifyStudent = (req, res, next) => {
  if (req.user.role !== "student")
    return res.status(403).send({ message: "Forbidden" });
  next();
};
