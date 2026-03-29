const express=require('express');
const router=express.Router();
const {viewMenu}=require('../../controllers/website/menu.controller');

module.exports=server=>{

    router.post('/menu/view',viewMenu);
    server.use('/api/website/',router);
}
