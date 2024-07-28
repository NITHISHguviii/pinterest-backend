const mongoose = require("mongoose");
const Connect = () => {
  try {
    mongoose
      .connect(
        process.env.NODE_ENV === "dev"
          ? "mongodb://localhost:27017/pinterest"
          : process.env.MONGO_URI
      )
      .then((res) => {
        console.log("Database Connection Success");
      });
  } catch (error) {
    console.log(error);
  }
};
module.exports = Connect;
