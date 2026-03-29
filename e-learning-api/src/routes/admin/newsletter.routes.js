const express=require('express');
const router=express.Router();
const {view} = require('../../controllers/admin/newsletter.controller');

module.exports=server=>{

    router.post('/newsletter/view',view);
    server.use('/api/admin/',router);
}        