import sequelize from 'sequelize';
import db from './database.json'

// Thay đổi thông tin kết nối cơ sở dữ liệu tại đây
const sequelize = new Sequelize(
    db.development.database,
    db.development.username,
    db.development.password, {
    host: db.development.host,
    dialect: db.development.dialect, // Chọn dialect phù hợp với cơ sở dữ liệu của bạn (mysql, postgres, sqlite, mssql, ...)
});

// Kết nối đến cơ sở dữ liệu
const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { connection };
