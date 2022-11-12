const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('empleado', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    situacionLaboral: {
        type: DataTypes.ENUM('ACTIVO', 'INACTIVO'),
        defaultValue: 'ACTIVO'
    },
    domicilio: {
      type: DataTypes.STRING,
    },
    ciudad: {
      type: DataTypes.STRING,
    },
    fechaAlta: {
      type: DataTypes.DATE,
      allowNull: false
    },    
    fechaBaja: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    estado: {
      type: DataTypes.ENUM('IN', 'OUT'),
      defaultValue: 'OUT'
    },
  });
};

