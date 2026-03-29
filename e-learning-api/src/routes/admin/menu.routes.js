const express=require('express');
const router=express.Router();
const {create,view,details,destroy,update}=require('../../controllers/admin/menu.controller');

module.exports=server=>{

   router.post('/create',create);
   router.post('/view',view);
   router.post('/update/:id',update);
   router.post('/delete',destroy);
 
   server.use('/api/admin/menu',router);
}


