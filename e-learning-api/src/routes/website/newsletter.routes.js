const express = require('express');
const rouer=express.Router();
const {create} = require('../../controllers/website/newsletter.controller');

module.exports=server=>{

    rouer.post('/newsletter/create',create);

     server.use('/api/website/',rouer);
}