const express = require("express");
const {
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  addTasks,
} = require("../controllers/tasks");
const router = express.Router();

router.route("/").get(getAllTasks).post(addTasks);

router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = router;
