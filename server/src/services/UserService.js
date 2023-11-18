import bcrypt from 'bcrypt';
const db = require("../db/models");

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = checkEmailExist(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: {
                        include: ['email', 'roleId', 'password'],
                        exclude: ['password']
                    }
                });
                if (user) {
                    // compare password 
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `OK`;

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `You's Email isn't existing in your system. plz try other settings`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

let checkEmailExist = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
}

let getAllUser = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            let user = '';
            if (userId && userId === 'All') {
                user = db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    }
                });
            }
            if (userId && userId !== 'All') {
                user = db.User.findOne({
                    attributes: {
                        exclude: ['password'],
                    },
                    where: {
                        id: userId,
                    }
                });
            }
            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser
}
