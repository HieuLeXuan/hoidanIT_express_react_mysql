import userService from '../services/UserService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs paramater!',
            data: {}
        });
    }

    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errorCode: userData.errCode,
        message: userData.errMessage,
        data: userData.user ? userData.user : {}
    });
}

let handleGetAllUsers = async (req, res) => {
    let userId = req.query.id; // All, id

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

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}
