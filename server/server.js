// import bcrypt from "bcrypt";

// const password = "password1";
// // hashes it 2^salt?
// const salt = await bcrypt.genSalt(13);
// const hash = await bcrypt.hash("password", salt);
// console.log(hash, password);
// // built in method compare to decrypt

// // - when user signs up, u get that data in database and hash the pass
// // - when user signs in, u "compare" the password to the hash with the method,
// // bc bcrypt hashs are never the same

import bcrypt from "bcrypt";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const db = JSON.parse(fs.readFileSync(path.join("./db.json"), "utf8"));
const authUsers = db.authUsers;
const employees = db.employees;

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  const user = authUsers.find((u) => u.email === email);
  if (!user) return res.status(400).json({ error: "user not found" });
  const isMatch = await bcrypt.compare(password, user.hashed_password);
  if (!isMatch) return res.status(401).json({ error: "wrong password" });
  res.json({ message: "signed in!" });
});

app.get("/users", (req, res) => {
  console.log("Sending employees:", employees.length);

  res.json(employees);
});

app.get("/users/:id", (req, res) => {
  const user = employees.find((u) => u._id === req.params.id);
  if (!user) return res.status(400).json({ error: "user not found" });
  res.json(user);
});

app.post("/sign-up", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (authUsers.some((u) => u.email === email)) {
    return res.status(400).json({ error: "email already exists" });
  }

  const hashed_password = await bcrypt.hash(password, 13);

  const newAuthUser = { email, hashed_password };
  const newEmployee = {
    _id: (employees.length + 1).toString(),
    first_name,
    last_name,
    email,
    user_avatar: "",
    first_native_name: "",
    middle_native_name: "",
    last_native_name: "",
    department: "",
    building: "",
    room: 0,
    desk_number: 0,
    isRemoteWork: false,
    phone: "",
    zoom_id: "",
    zoom_link: "",
    citizenship: "",
    date_birth: { year: 0, month: 0, day: 0 },
    manager: { id: "", first_name: "", last_name: "" },
    visa: [],
  };
  employees.push(newEmployee);

  fs.writeFileSync(
    path.join("./db.json"),
    JSON.stringify({ authUsers, employees }, null, 2)
  );

  res.json({ message: "User signed up successfully", employee: newEmployee });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
