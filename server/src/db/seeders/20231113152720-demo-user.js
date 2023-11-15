'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    // email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    // address: DataTypes.STRING,
    // gender: DataTypes.STRING,
    // roleId: DataTypes.STRING,
    // phonenumber: DataTypes.STRING,
    // positionId: DataTypes.STRING,
    // image: DataTypes.STRING,
    return queryInterface.bulkInsert('Users', [{
      email: "admin@gmail.com",
      password: "123456",
      firstName: 'Hieu',
      lastName: 'LeXuan',
      address: "Nghe An",
      gender: 1,
      roleId: "",
      phoneNumber: "0966055919",
      positionId: "",
      image: "",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
