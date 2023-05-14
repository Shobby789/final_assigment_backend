const mongoose = require("mongoose");
// mongoDB project my-restaurant
const URL =
  "mongodb+srv://smshoaib2001:myrestaurant@cluster0.cf9jrrw.mongodb.net/myrestaurant?retryWrites=true&w=majority";

const main = async () => {
  await mongoose.connect(URL, { useNewUrlParser: true });
  console.log("MongoDB connected");
  const fetched_data = await mongoose.connection.db.collection("Items");
  fetched_data.find({}).toArray(function (err, data) {
    if (err) {
      console.log("error: ", err);
    } else {
      global.food_items = data;
      console.log(global.food_items);
    }
  });
};

module.exports = main;
