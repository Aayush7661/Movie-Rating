const { sequelize } = require("./models");
const app = require("./app");

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Error syncing database:", err);
  }
};

startServer();
