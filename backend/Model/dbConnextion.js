const mongoose = require("mongoose");

const link="mongodb+srv://sharmaharshit769:portfolio@cluster0.ofeae87.mongodb.net/Syvora_assesment"

const connectToMongo = () => {
  mongoose
    .connect(link)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log("Some error occured in database connection", err);
    });
};

module.exports = connectToMongo;
