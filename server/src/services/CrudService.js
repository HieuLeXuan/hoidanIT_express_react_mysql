import db from '../db/models/index';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const createNewUser = async (data) => {
    // console.log(`constroller ${data}`);
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasswordFromBcrypt = await bcryptPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === 1 ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber
            });

            resolve('ok! create a new user successfully!');
        } catch (e) {
            reject(e);
        }
    });
}

const bcryptPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, saltRounds);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createNewUser: createNewUser,
};
