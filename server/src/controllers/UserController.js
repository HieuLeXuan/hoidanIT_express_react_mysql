const userService = require('../services/UserService');

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: 'Missing inputs paramater!',
            data: {}
        });
    }

    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errorCode: userData.errorCode,
        message: userData.errMessage,
        data: userData.user ? userData.user : {}
    });
}

let handleGetAllUsers = async (req, res) => {
    let userId = req.params.type; // All, id

    if (!userId) {
        return res.status(200).json({
            errorCode: 0,
            message: 'Missing requirement paramaters',
            user: []
        });
    }

    let user = await userService.getAllUser(userId);
    return res.status(200).json({
        errorCode: 0,
        message: 'OK',
        user
    });
}

let handleCreateUser = async (req, res) => {
    let newUser = req.body;
    let response = await userService.createUser(newUser);
    return res.status(200).json(response);
}

let handleEditUser = async (req, res) => {
    let newUser = req.body;

    if (!newUser) {
        return res.status(400).json({
            errorCode: 1,
            message: `Data to update can not be empty`
        });
    }

    let userId = req.params.id;

    let response = await userService.editUser(newUser, userId);
    return res.status(200).json(response);
}

let handleDeleteUser = async (req, res) => {
    let userId = req.params.id;

    if (!userId) {
        return res.status(200).json({
            errorCode: 1,
            message: 'Missing requirement paramaters'
        });
    }
    let resData = await userService.deleteUser(userId);
    return res.status(200).json(resData);
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateUser: handleCreateUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}
