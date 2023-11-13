// webRoutes.js
import express from 'express';
import homeController from '../controllers/HomeController'

const initWebRoutes = (app) => {
  const router = express.Router();

  // Định nghĩa các tuyến đường trong đây
  router.get('/', homeController.getHomePage);

  // Thêm router vào ứng dụng
  app.use('/', router);
};

module.exports = initWebRoutes;
