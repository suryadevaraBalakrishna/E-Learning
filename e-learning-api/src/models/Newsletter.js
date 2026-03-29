const mongoose = require('mongoose');

const newsletterSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Email is required'],
          validate: {
            validator: async function (v) {
                const email = await this.constructor.findOne({ email: v });
                return !email;
            },
            message: props => `The specified email is already in use.`
        }
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


const NewsletterModal=mongoose.model('Newsletter',newsletterSchema);
module.exports=NewsletterModal;