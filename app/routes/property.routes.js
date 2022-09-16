const express = require("express");
const authJwt = require("./../middleware/authJwt");
const popertyController = require("./../controllers/property.controller")

const router = express.Router();


router.post('/create', [
    authJwt.verifyToken
], popertyController.create);

router.get('/all-properties', [
    authJwt.verifyToken,
    authJwt.isAdmin
], popertyController.findAll);


router.get('/details/:id', [
    authJwt.verifyToken,
    authJwt.isAdmin
], popertyController.findOne);


router.patch('/update/:id', [
    authJwt.verifyToken,
    authJwt.isAdmin
], popertyController.update);


router.delete('/delete/:id', [
    authJwt.verifyToken,
    authJwt.isAdmin
], popertyController.delete);

router.delete('/delete-all', [
    authJwt.verifyToken,
    authJwt.isAdmin
], popertyController.deleteAll);


router.get('/ready-to-sale', [
    authJwt.verifyToken,
    authJwt.isAdmin
], popertyController.allReadyToSaleProperty);





module.exports = router;