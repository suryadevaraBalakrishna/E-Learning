const mongoose=require('mongoose');

const teamSchema=new mongoose.Schema({
    image:{
        type:String,
        required:[true,'image is required']
    },
    name:{
        type:String,
        required:[true,'name is required']
    },
    designation:{
        type:String,
        required:[true,'designation is required']
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

const teamModal=mongoose.model('Team',teamSchema);
module.exports=teamModal;