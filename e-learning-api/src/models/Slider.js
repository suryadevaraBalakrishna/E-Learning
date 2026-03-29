const mongoose=require('mongoose');

const sliderSchema=new mongoose.Schema({
    image:{
        type:String,
        required:[true,'Image is required']
    },
    subheading:{
          type:String,
        required:[true,'subheading is required']
    },
    heading:{
          type:String,
        required:[true,'heading is required']
    },
    description:{
          type:String,
        required:[true,'description is required']
    },
    button_txt:{
          type:String,
        required:[true,'text is required']
    },
    button_link:{
          type:String,
        required:[true,'link is required']
    },
    button_txt_two:{
          type:String,
        required:[true,'text is required']
    },
    button_link_two:{
          type:String,
        required:[true,'link is required']
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


const SliderModal=mongoose.model('slider',sliderSchema);
module.exports=SliderModal;
