const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: process.env.DBDIALECT,
  }
);

const Schools = sequelize.define(
  'School',
  {
    schoolId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    schoolName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schoolDescription: {
      type: DataTypes.STRING,
    },
    schoolMainPhoneNumber: {
      type: DataTypes.STRING,
    },
    schoolAddressLine1: {
      type: DataTypes.STRING,
    },
    schoolAddressLine2: {
      type: DataTypes.STRING,
    },
    schoolCity: {
      type: DataTypes.ENUM('Lowell', 'Charlotte'),
    },
    schoolState: {
      type: DataTypes.ENUM('Massachussetts', 'Connecticut', 'New York'),
    },
    schoolZipCode: {
      type: DataTypes.STRING,
    },
    schoolBillingEmail: {
      type: DataTypes.STRING,
    },
    schoolSupportEmail: {
      type: DataTypes.STRING,
    },
    schoolManagerFirstName: {
      type: DataTypes.STRING,
    },
    schoolManagerLastName: {
      type: DataTypes.STRING,
    },
    schoolManagerEmail: {
      type: DataTypes.STRING,
    },
    schoolManagerPhoneNumber: {
      type: DataTypes.STRING,
    },
    schoolEmergencyEmail: {
      type: DataTypes.STRING,
    },
    schoolEmergencyContactPhoneNumber: {
      type: DataTypes.STRING,
    },
    schoolWebsiteURL: {
      type: DataTypes.STRING,
    },
    schoolLegalBusinessName: {
      type: DataTypes.STRING,
    },
    schoolBusinessTaxIDNumber: {
      type: DataTypes.STRING,
    },
    schoolBankAccountNumber: {
      type: DataTypes.STRING,
    },
    schoolBankAccountRoutingNumber: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = Schools;
