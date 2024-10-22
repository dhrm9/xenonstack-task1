const mongoose = require("mongoose");

// MONGO_URL='mongodb+srv://aman_jain:Aman2001@aman.k8abeqp.mongodb.net/blood-donation'
MONGO_URL='mongodb+srv://saket9max:saket1234@cluster0.jrecw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/real-Estate'

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(
      `Connected To Mongodb Database ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(`Mongodb Database Error ${error}`);
  }
};

module.exports = connectDB;