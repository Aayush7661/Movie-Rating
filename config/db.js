const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const createConnection = async () => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD || "",
  });
};

// Function to create the database if it doesn't exist
const createDatabase = async () => {
  const connection = await createConnection(); // Create a connection

  try {
    // Create the database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`
    );
  } catch (err) {
    throw err;
  } finally {
    await connection.end();
  }
};

// Initialize Sequelize with the configuration
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, // Database name
  process.env.MYSQL_USER, // Database username
  process.env.MYSQL_PASSWORD || "", // Database password (fallback to empty string if not provided)
  {
    host: process.env.MYSQL_HOST, // Database host
    port: process.env.MYSQL_PORT || 3306, // Database port (default: 3306)
    dialect: "mysql", // Database dialect
  }
);

// Function to create an admin user if it doesn't exist
const createAdminUser = async () => {
  try {
    const { User } = require("../models"); // Import the User model

    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    // Check if the admin user already exists
    const adminUser = await User.findOne({
      where: { username: adminUsername },
    });

    if (!adminUser) {
      // Hash the admin password
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      // Create the admin user
      await User.create({
        username: adminUsername,
        password: hashedPassword,
        email: "admin@gmail.com",
        mobile: "+918537532853",
        age: 30,
        role: "admin",
      });
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.log(error);
  }
};

const initializeDatabase = async () => {
  try {
    await createDatabase();
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("All tables have been synchronized.");
    await createAdminUser();
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

initializeDatabase();

module.exports = { sequelize };
