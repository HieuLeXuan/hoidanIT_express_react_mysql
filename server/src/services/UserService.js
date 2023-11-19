const bcrypt = require('bcrypt');
const db = require("../db/models");
const saltRounds = 10;

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
                        userData.errorCode = 0;
                        userData.errMessage = `OK`;

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errorCode = 3;
                        userData.errMessage = `Wrong password`;
                    }
                } else {
                    userData.errorCode = 2;
                    userData.errMessage = `User's not found`;
                }
            } else {
                // return error
                userData.errorCode = 1;
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

let createUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isCheck = await checkEmailExist(user.email);
            console.log(isCheck);
            if (isCheck) {
                userData = {
                    errorCode: 1,
                    message: 'This email address already exists, plz try other email address',
                };
            } else {
                console.log('>>> run code here');

                const hashPasswordFromBcrypt = await bcryptPassword(user.password);
                await db.User.create({
                    email: user.email,
                    password: hashPasswordFromBcrypt,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    gender: user.gender === 1 ? true : false,
                    roleId: user.roleId,
                    phoneNumber: user.phoneNumber
                });
                userData = {
                    errorCode: 0,
                    message: 'Create user successfully',
                    user
                };
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

let editUser = (newUser, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await db.User.findOne({
                where: { id }
            });

            if (user) {
                await db.User.update(
                    {
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        address: newUser.address,
                    },
                    { where: { id } }
                )
                userData = {
                    errorCode: 0,
                    message: 'Update user successfully'
                };
            } else {
                userData = {
                    errorCode: 2,
                    message: 'User not found'
                };
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            });
            if (user) {
                await db.User.destroy({
                    where: { id: id },
                })
                resolve({
                    errorCode: 0,
                    message: `Delete user successfully`,
                });
            } else {
                resolve({
                    errorCode: 1,
                    message: `User does not exist`,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createUser: createUser,
    editUser: editUser,
    deleteUser: deleteUser
}
