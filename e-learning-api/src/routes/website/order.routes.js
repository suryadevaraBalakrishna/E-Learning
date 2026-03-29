const express=require('express');
const router=express.Router();
const {orderPlaced, changeStatus, myOrders}=require('../../controllers/website/order.controller');


module.exports = server => {
     
     router.post('/order-placed',orderPlaced)
       router.post('/change-status',changeStatus)
       router.post('/my-order',myOrders)


     server.use('/api/website/order', router);
}