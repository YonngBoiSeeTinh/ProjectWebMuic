const express = require("express");
const router= express.Router();
const orderController = require('../controllers/OrderController');

router.post('/create', orderController.createOrder);
router.put('/update/:id', orderController.updateOrder);
router.get('/get', orderController.getAllOrders);
router.get('/getByUserId/:userId', orderController.getByUserId);
router.delete('/delete/:id', orderController.deleteOrder);
module.exports = router;