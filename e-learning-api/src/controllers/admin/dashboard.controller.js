const CourseModal=require("../../models/Course");
const UserModal=require("../../models/User");
const OrderModal=require("../../models/Order");

exports.view=async(request,response)=>{
     const addCondition = [
        {
            deleted_at: null,
        }
    ];

    const orCondition = [];



    if (addCondition.length > 0) {
        var filter = { $and: addCondition }
    } else {
        var filter = {}
    }

    if (orCondition.length > 0) {
        filter.$or = orCondition;
    }

    var courses = await CourseModal.find(filter).countDocuments();
    var users = await UserModal.find(filter).countDocuments();
    var orders = await OrderModal.find(filter).countDocuments();

   const output={
    _status:true,
    _message:"Dashboard data",
    _data:{
        courses: courses,
        users: users,
        orders: orders
    }
   }

   response.send(output);

}