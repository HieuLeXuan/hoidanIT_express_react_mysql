// webRoutes.js
import express from 'express';
import homeController from '../controllers/HomeController';
import userController from '../controllers/UserController';

const initWebRoutes = (app) => {
  const router = express.Router();

  // Định nghĩa các tuyến đường trong đây
  router.get('/', homeController.getHomePage);

  // crud route
  router.get('/crud', homeController.getCrudPage);

  // get edit crud
  router.get('/edit-crud', homeController.getEditCrudPage);

  // post user (update user)
  router.post('/put-crud', homeController.updateUser);

  // delete user
  router.get('/delete-crud', homeController.deleteUser);

  // display all crud
  router.get('/display-crud', homeController.getAllCrudPage);

  // post crud
  router.post('/post-crud', homeController.createUser);

  // api login
  router.post('/api/login', userController.handleLogin);
  // api get all users
  router.get('/api/get-users/:type', userController.handleGetAllUsers);
  // api create users
  router.post('/api/create-user', userController.handleCreateUser);
  // api edit users
  router.put('/api/edit-user/:id', userController.handleEditUser);
  // api delete users
  router.delete('/api/delete-user/:id', userController.handleDeleteUser);

  // Thêm router vào ứng dụng
  app.use('/', router);
};

module.exports = initWebRoutes;
