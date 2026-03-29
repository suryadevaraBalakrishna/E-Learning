const mongoose=require('mongoose');

const serviceSchema=new mongoose.Schema({
    image:{
        type:String,
        required:[true,'image is required']
    },
    title:{
        type:String,
        required:[true,'title is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
      order:{
        type:Number,
        default:0,
    },
     status:{
        type:Boolean,
        default:true,
     },
     createdAt:{
        type:Date,
        default:Date.now,
     },
     updatedAt:{
        type:Date,
        default:Date.now,
     },
     deletedAt:{
        type:Date,
        default:null,
     }
})

const serviceModal=mongoose.model('Service',serviceSchema);
module.exports=serviceModal;