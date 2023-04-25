const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define(
    "Profesores",
    {
      id: {
        type: DataTypes.UUID,
        // type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        // autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      datebirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nacionalidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rol: {
        type: DataTypes.STRING,
        defaultValue: "profesor",
      },
    },
    {
      timestamps: false,
    }
  );
};
