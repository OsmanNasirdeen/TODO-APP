require("dotenv").config();
const express = require("express");

const app = express();
const Tasks = require("./routes/tasks");

const connectDB = require("./database/connectdb");
app.use(express.static("./frontend"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1/tasks", Tasks);
//routes

//app.get("/api/v1/tasks") -get all tasks
//app.get("/api/v1/tasks/:id") -get single task
//app.patch("/api/v1/tasks/:id") -update a  task
//app.post("/api/v1/tasks") -create a task
//app.delete("/api/vi/tasks/:id")

const port = 7000;
const startServer = async () => {
  try {
    await connectDB(process.env.MY_DB_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
