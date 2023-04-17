const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Materias",
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
      namemateria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      anio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      temas: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
