const express=require('express');
const router=express.Router();
const {view}=require('../../controllers/admin/dashboard.controller');

module.exports=server=>{
   

    router.post('/view',view);
 
    server.use('/api/admin/dashboard',router);
}




