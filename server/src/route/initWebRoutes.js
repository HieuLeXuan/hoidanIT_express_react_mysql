// webRoutes.js
import express from 'express';
import homeController from '../controllers/HomeController';

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

  // display all crud
  router.get('/display-crud', homeController.getAllCrudPage);

  // post crud
  router.post('/post-crud', homeController.createUser);

  // Thêm router vào ứng dụng
  app.use('/', router);
};

module.exports = initWebRoutes;
