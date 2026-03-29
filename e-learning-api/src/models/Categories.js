const mongoose=require('mongoose');

const categoriesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
       image:{
        type: String,
        default:''
    },
      slug:{
        type: String,
        default:''
    },
     course_ids:[{
          type: String,
           ref: 'courses'
    }],
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


const categoriesModal=mongoose.model('categories',categoriesSchema);
module.exports=categoriesModal;