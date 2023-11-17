import db from '../db/models/index';
import crudService from '../services/CrudService';

let createUser = async (req, res) => {
    let message = await crudService.createNewUser(req.body);
    console.log(message);
    return res.render('HomePage.ejs');
}

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('HomePage.ejs');
    } catch (e) {
        console.log(e);
    }

}

let getCrudPage = (req, res) => {
    res.render('CRUD.ejs');
}

let getAllCrudPage = async (req, res) => {
    let data = await crudService.getAllCrud();
    return res.render('DisplayCRUD.ejs', { dataTable: data });
}

let getEditCrudPage = async (req, res) => {
    let userId = req.query.id;
    let user = await crudService.getUserById(userId);

    if (user) {
        return res.render('EditCRUD.ejs', { dataTable: user });
    } else {
        return res.send('User not found!');
    }
}

let updateUser = async (req, res) => {
    let users = await crudService.updateUserService(req.body);
    return res.render('DisplayCRUD.ejs', { dataTable: users });
}

let deleteUser = async (req, res) => {
    let id = req.query.id;

    if (id) {
        await crudService.deleteUserService(id);
        return res.send('delete the use successfully!');
    } else {
        return res.send('user not found!');
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCrudPage: getCrudPage,
    createUser: createUser,
    getAllCrudPage: getAllCrudPage,
    getEditCrudPage: getEditCrudPage,
    updateUser: updateUser,
    deleteUser: deleteUser
}
