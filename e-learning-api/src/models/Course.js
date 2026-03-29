const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    image: {
        type: String,
        default: ''
    },
    slug: {
        type: String,
        default: ''
    },

    description: {
        type: String,
        required: [true, 'description is required']
    },
    curriculum: {
        type: String,
        required: [true, 'curriculum is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    categories_id: [{
        type: String,
        required: [true, 'categories is required'],
        ref: 'categories',
    }],
     instructor_id: [{
        type: String,
        required: [true, 'instructor is required'],
        ref: 'Team',
    }],
    video:{
        type:String,
        default:''
    },
    order: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
})

const courseModal = mongoose.model('course', courseSchema)
module.exports = courseModal;
