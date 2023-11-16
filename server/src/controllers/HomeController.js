import db from '../db/models/index';
import crudService from '../services/CrudService';

let createUser = async (req, res) => {
    // console.log(req.body);
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

module.exports = {
    getHomePage: getHomePage,
    getCrudPage: getCrudPage,
    createUser: createUser,
    getAllCrudPage: getAllCrudPage
}
