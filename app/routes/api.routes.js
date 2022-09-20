const express = require("express");
const authJwt = require("./../middleware/authJwt");
const productController = require("./../controllers/product.controller");
const reviewController = require("./../controllers/review.controller");
const userController = require("./../controllers/user.controller");

const router = express.Router();

// user  route
router.get('/user/information', [authJwt.verifyToken], userController.userInfo)


// Product Route
router.get('/product/index', [authJwt.verifyToken,authJwt.isAdmin], productController. findAll);
router.post('/product/store', [authJwt.verifyToken,authJwt.isAdmin], productController.store);
router.get('/product/details/:id', [authJwt.verifyToken,authJwt.isAdmin], productController.findOne);
router.patch('/product/update/:id', [authJwt.verifyToken,authJwt.isAdmin], productController.update);
router.delete('/product/delete/:id', [authJwt.verifyToken,authJwt.isAdmin], productController.delete);

// Review Route
router.get('/review/index', [authJwt.verifyToken,authJwt.isAdmin], reviewController. findAll);
router.post('/review/store', [authJwt.verifyToken,authJwt.isAdmin], reviewController.store);
router.get('/review/details/:id', [authJwt.verifyToken,authJwt.isAdmin], reviewController.findOne);
router.patch('/review/update/:id', [authJwt.verifyToken,authJwt.isAdmin], reviewController.update);
router.delete('/review/delete/:id', [authJwt.verifyToken,authJwt.isAdmin], reviewController.delete);




module.exports = router;

