const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('egreso', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    idIngreso: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    horasTrabajadas: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    horasMinTrabajadas: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    masOchoHoras: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
  });
};
