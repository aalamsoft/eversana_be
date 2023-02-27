const express = require('express');
const masterData = require('./masterData.route')
const router = express.Router();

const defaultRoutes = [
  {
    path: '/master-data',
    route: masterData
  }

];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
}
);
module.exports = router;
