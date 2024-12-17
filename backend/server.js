import app from "./app.js";
import cloudinary from "cloudinary";
import { User } from "./models/userSchema.js";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
const adminData = {
  firstName: "Abdul",
  lastName: "Moiz",
  dob: new Date("07/14/2003"),
  nic: "6110131842197",
  email: "abdulmoiziphone4@gmail.com",
  phone: "03348537793",
  gender: "Male",
  password: "abdulmoiz123", // Make sure to change this to a secure password
  role: "Admin",
};

// Create and save the admin user
const createAdminUser = async () => {
  try {
    const adminUser = new User(adminData);
    await adminUser.save();
    console.log("Admin user created successfully!");
  } catch (err) {
    console.error("Error creating admin user:", err);
  }
};

// Call the function to create the admin user
createAdminUser();