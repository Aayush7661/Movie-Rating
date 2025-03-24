module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      mobile: { type: DataTypes.STRING, unique: true },
      age: DataTypes.INTEGER,
      role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
    },

    {
      timestamps: true,
    }
  );

  return User;
};
