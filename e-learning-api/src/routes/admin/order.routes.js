const express=require('express');
const router=express.Router();
const {view}=require('../../controllers/admin/order.controller');


module.exports = server => {
     
     router.post('/view',view)

     server.use('/api/admin/order', router);
}