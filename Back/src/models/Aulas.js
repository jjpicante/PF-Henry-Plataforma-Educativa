const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Aulas",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        // type: DataTypes.INTEGER,
        // primaryKey: true,
        // autoIncrement: true,
      },
      anio: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
