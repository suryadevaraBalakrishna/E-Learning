const mongoose=require('mongoose');

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    slug:{
        type:String,
        required:[true,"Slug is required"],
    },
    link:{
        type:String,
        required:[true,"Link is required"], 
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Menu',
        default:null,
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


const MenuModal=mongoose.model('Menu',menuSchema);
module.exports=MenuModal;