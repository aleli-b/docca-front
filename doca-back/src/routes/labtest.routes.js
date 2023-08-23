const { Router } = require('express');
const router = Router();
const labtestController = require('../controllers/labtest.controller');
const jwtVerify = require('../middlewares/isAuth');

router.get('/labtests', labtestController.getLabtests);

router.post('/labtests', labtestController.uploadLabtest);

module.exports = router;