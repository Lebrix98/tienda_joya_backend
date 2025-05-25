const {
  defaultUrl,
  filterJewel,
  readAllJewel,
} = require("../controllers/controller.js");

const { Router } = require("express");

const router = Router();

router.get("/", readAllJewel);

router.get("/filtros", filterJewel);

router.use(defaultUrl);

module.exports = {
  router,
};
