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

module.exports = {
    handleLogin: handleLogin,
}
