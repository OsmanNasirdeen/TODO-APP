const tasks = require("../database/DB SCHEMA/Task");

const getAllTasks = async (req, res) => {
  const allTasks = await tasks.find({});
  res.status(200).json({ allTasks });
};

const getSingleTask = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const task = await tasks.findOne({ _id: userID });
    if (!task) {
      return res.status(404).json({ msg: `no member with the id: ${userID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: userID } = req.params;

    const task = await tasks.findOneAndUpdate({ _id: userID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({
        msg: `the id ${userID} you provided did not match any in our database`,
      });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const task = await tasks.findOneAndDelete({ _id: userID });
    if (!task) {
      return res.status(404).json({
        msg: `the id ${userID} you provided did not match any in our database`,
      });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const addTasks = async (req, res) => {
  try {
    const user = await tasks.create(req.body);
    res.status(201).json({ task: user });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  addTasks,
};
