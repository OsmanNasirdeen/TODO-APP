const mongoose = require("mongoose");

const connectdb = (URL) => {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectdb;
