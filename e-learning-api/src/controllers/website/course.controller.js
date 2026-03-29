const courseModal = require('../../models/Course');
const categoriesModal = require('../../models/Categories');
const teamModal = require('../../models/Team');
var slugify = require('slugify');



exports.view = async (request, response) => {
    try {
        var current_page = 1;
        var limit = 4;
        var skip = (current_page - 1) * limit;

        if (request.body != undefined) {
            var current_page = request.body.page ? request.body.page : current_page;
            var limit = request.body.limit ? request.body.limit : limit;
            var skip = (current_page - 1) * limit;
        }

        const addCondition = [
            {
                deleted_at: null,
            }
        ];

        const orCondition = [];

        if (request.body != undefined) {
            if (request.body.name != undefined) {
                if (request.body.name != '') {
                    var name = new RegExp(request.body.name, "i");
                    orCondition.push({ name: name })
                }
            }


            if (request.body.categories_id != undefined) {
                if (request.body.categories_id != '') {
                    var categories_id = new RegExp(request.body.categories_id, "i");
                    addCondition.push({ categories_id: categories_id })
                }
            }


            if (request.body.instructor_id != undefined) {
                if (request.body.instructor_id != '') {
                    var instructor_id = new RegExp(request.body.instructor_id, "i");
                    addCondition.push({ instructor_id: instructor_id })
                }
            }


        }



        if (addCondition.length > 0) {
            var filter = { $and: addCondition }
        } else {
            var filter = {}
        }

        if (orCondition.length > 0) {
            filter.$or = orCondition;
        }






        var totalRecords = await courseModal.find(filter).countDocuments();
        var total_pages = Math.ceil(totalRecords / limit);


        let sortQuery = { _id: -1 }


        if(request.body?.sort){
        if (request.body.sort === "price_low") sortQuery = { price: 1 }
        if (request.body.sort === "price_high") sortQuery = { price: -1 }
        if (request.body.sort === "name_asc") sortQuery = { name: 1 }
        if (request.body.sort === "name_desc") sortQuery = { name: -1 }
        }


        await courseModal.find(filter)
            .populate('categories_id', 'name')
            .populate('instructor_id', 'name')
            .skip(skip).limit(limit)
            .sort(sortQuery)
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record Found",
                    _course_image_path: process.env.course_setting_image_path,
                    _course_video_path: process.env.course_setting_video_path,
                    _pagination: {
                        current_page: current_page,
                        total_pages: total_pages,
                        total_records: totalRecords,
                    },
                    _data: result
                }

                response.send(output);

            })
            .catch((error) => {
                const output = {
                    _status: false,
                    _message: "No record found",
                    _error: error.message,
                    _data: null,
                }
                response.send(output);
            })
    }
    catch (error) {
        const output = {
            _status: false,
            _message: "something went wrong",
            _error: error.message,
            _data: null
        }

        response.send(output);
    }

}


exports.details = async (request, response) => {
    try {
        await courseModal.findOne({ slug: request.body.slug })
            .populate('categories_id', 'name')
            .populate('instructor_id', 'name')
            .then((result) => {
                if (result) {
                    const output = {
                        _status: true,
                        _message: 'Record Found',
                        _course_image_path: process.env.course_setting_image_path,
                        _course_video_path: process.env.course_setting_video_path,
                        _data: result
                    }

                    response.send(output);
                } else {
                    const output = {
                        _status: false,
                        _message: 'No Record Found',
                        _data: null
                    }

                    response.send(output);
                }
            })
    }
    catch (error) {
        const output = {
            _status: false,
            _message: "something went wrong",
            _error: error.message,
            _data: null
        }

        response.send(output);
    }

}



exports.relatedCourses=async(request,response)=>{
     let category_id = request.body.category_id;
    let exclude_id = request.body.exclude_id;

    if (!category_id) {
        const output = {
            _status: false,
            _message: 'Category id is required',
            _data: []
        };
        return response.send(output);
    }

    if (!exclude_id) {
        const output = {
            _status: false,
            _message: 'exclude id is required',
            _data: []
        };
        return response.send(output);
    }

    try{
        const result=await courseModal.find({
            categories_id:category_id,
             _id: { $ne: exclude_id },
            deleted_at: null,
        }).limit(3).populate('categories_id', 'name');

          if (result.length > 0) {
            const output = {
                _status: true,
                _message: 'Record Found',
                  _course_image_path: process.env.course_setting_image_path,
                    _course_video_path: process.env.course_setting_video_path,
                _data: result
            };
            return response.send(output);
        } else {
            const output = {
                _status: false,
                _message: 'No Record Found',
                _data: []
            };
            return response.send(output);
        }
      

    }catch (error) {
        const output = {
            _status: false,
            _message: 'Something went wrong!',
            _data: []
        };
        return response.send(output);
    }
}






