const express = require('express');
const router=express.Router();
const {view}=require('../../controllers/website/setting.controller');


module.exports=server=>{
    
    router.post('/setting/view',view);
    server.use('/api/website/',router);
}

