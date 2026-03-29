const moongoose = require('mongoose');

const settingSchema=new moongoose.Schema({
     sitename:{
        type:String,
        required:[true,"Site name is required"],
     },
     logo:{
        type:String,
        required:[true,"Logo is required"],
     },
     phone:{
        type:String,
        required:[true,"Phone is required"],
     },
     email:{
        type:String,
        required:[true,"Email is required"],        
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

const SettingModal=moongoose.model('Setting',settingSchema);
module.exports=SettingModal;