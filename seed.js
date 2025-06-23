const mongoose = require("mongoose");
const axios = require("axios");
const User = require("./models/user.model");
require("dotenv").config();

const seeding = async () => {
  try {
    await mongoose.connect(process.env.URL_database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    const usercount = await User.countDocuments();
    if (usercount > 0) {
      console.log("Data already present. Seeding skipped.");
      return;
    }

    const response = await axios.get("https://randomuser.me/api/?results=50&nat=us");

    const userToSeed = response.data.results.map((user) => ({
      firstname: user.name.first,
      lastname: user.name.last,
      email: user.email,
      age: user.dob.age,
      city: user.location.city,
      picture: user.picture.large,
    }));

    console.log("Sample user to insert:", userToSeed[0]);

    await User.insertMany(userToSeed);
    console.log("Database seeded successfully with 50 users");
  } catch (error) {
    console.error("An error occurred during seeding:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

seeding();
