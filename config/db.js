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

const createDatabase = async () => {
  const connection = await createConnection();

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`
    );
  } catch (err) {
    throw err;
  } finally {
    await connection.end();
  }
};

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD || "",
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
    dialect: "mysql",
  }
);
const createAdminUser = async () => {
  try {
    const { User } = require("../models");

    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    const adminUser = await User.findOne({
      where: { username: adminUsername },
    });

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
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
