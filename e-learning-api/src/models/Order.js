const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
     user_id: {
        type: String,
        required: [true, 'user id is required'],
        ref: 'users'
    },
    order_id: {
        type: String,
        default: ''
    },
    payment_id: {
        type: String,
        default: ''
    },
    order_number: {
        type: String,
        default: ''
    },
    order_date: {
        type: Date,
        default: Date.now()
    },
    course_info: {
        type: Array,
        default: []
    },
    total_amount: {
        type: Number,
        default: 0,
    },
    discount_amount: {
        type: Number,
        default: 0,
    },
    net_amount: {
        type: Number,
        default: 0,
    },
    payment_status:{
        type:Number,
        default:1, //1-pending 2-success 3-failed
    },
    order_status:{
         type:Number,
        default:1, //1- In process 2-order placed 3-order cancelled 
    },
    status: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
        min: [0, 'Minimum value must be greater than 0'],
        max: [1000, 'Maximum value must be greater than 1000']
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date,
        default: '',
    }
})


const orderModal=mongoose.model('orders',orderSchema);
module.exports=orderModal;