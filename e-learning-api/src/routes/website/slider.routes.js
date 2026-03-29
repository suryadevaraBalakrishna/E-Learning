const express=require('express');
const router=express.Router();
const {view}=require('../../controllers/website/slider.controller');

module.exports=server=>{
     
       
        router.post('/view',view);

    server.use('/api/website/slider',router)
    
}
