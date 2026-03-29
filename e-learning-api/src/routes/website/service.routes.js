const express=require('express');
const router=express.Router();
const {view}=require('../../controllers/website/service.controller');

module.exports=server=>{
     
       
        router.post('/view',view);

    server.use('/api/website/service',router)
    
}
