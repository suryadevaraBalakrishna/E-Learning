const courseModal = require('../../models/Course');
const categoriesModal = require('../../models/Categories');
const teamModal = require('../../models/Team');
var slugify = require('slugify');

exports.create = async (request, response) => {
    try {
        var slug_detail = slugify(request.body.name, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: true,
            locale: 'vi',
            trim: true
        })

        const data = {
            name: request.body.name,
            image: request.files.image ? request.files.image[0].filename : null,
            video: request.files.video ? request.files.video[0].filename : null,
            order: request.body.order,
            slug: slug_detail,
            description: request.body.description,
            curriculum: request.body.curriculum,
            price: request.body.price,
            categories_id: request.body.categories_id,
            instructor_id: request.body.instructor_id,
        }

        const insertData = new courseModal(data);
        await insertData.save()
            .then(async (result) => {

                if (request.body.categories_id != undefined && request.body.categories_id != '') {
                    await categoriesModal.updateMany({
                        _id: request.body.categories_id
                    }, {
                        $push: {
                            course_ids: {
                                $each: [result._id]
                            }
                        }
                    })
                }


                if (request.body.instructor_id != undefined && request.body.instructor_id != '') {
                    await teamModal.updateMany({
                        _id: request.body.instructor_id
                    }, {
                        $push: {
                            course_ids: {
                                $each: [result._id]
                            }
                        }
                    })
                }


                const output = {
                    _status: true,
                    _message: "Record inserted successfully",
                    _data: result,
                }

                response.send(output);
            })
            .catch((error) => {
                var errorMessage = [];
                for (err in error.errors) {
                    errorMessage.push(error.errors[err].message);
                }
                const output = {
                    _status: false,
                    _message: "Record not inserted",
                    _error: errorMessage,
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

        await courseModal.find(filter)
            .populate('categories_id', 'name')
            .populate('instructor_id', 'name')
            .skip(skip).limit(limit)
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



exports.update = async (request, response) => {
    try {
        var slug_detail = slugify(request.body.name, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: true,
            locale: 'vi',
            trim: true
        })

        const data = {
            name: request.body.name,
            order: request.body.order,
            slug: slug_detail,
            description: request.body.description,
            curriculum: request.body.curriculum,
            price: request.body.price,
            categories_id: request.body.categories_id,
            instructor_id: request.body.instructor_id
        }

        if (request.files?.image) {
            data.image = request.files.image[0].filename;
        }

        if (request.files?.video) {
            data.video = request.files.video[0].filename;
        }

        await courseModal.updateOne({
            _id: request.params.id
        }, {
            $set: data
        }).then(async (result) => {

            if (request.body.categories_id != undefined && request.body.categories_id != '') {
                await categoriesModal.updateMany({
                    _id: request.body.categories_id
                }, {
                    $push: {
                        course_ids: {
                            $each: [result._id]
                        }
                    }
                })
            }


            if (request.body.instructor_id != undefined && request.body.instructor_id != '') {
                await teamModal.updateMany({
                    _id: request.body.instructor_id
                }, {
                    $push: {
                        course_ids: {
                            $each: [result._id]
                        }
                    }
                })
            }


            const output = {
                _status: true,
                _message: 'Record Updated',
                _data: result
            }

            response.send(output);
        })
            .catch((error) => {
                const output = {
                    _status: false,
                    _message: 'Record not Updated',
                    _error: error.message,
                    _data: null
                }
                response.send(output);
            })

    }
    catch (error) {
        const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        }

        response.send(output);
    }
}



exports.details = async (request, response) => {
    try {
        await courseModal.findById({
            _id: request.body.id
        })
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record Found",
                    _course_image_path: process.env.course_setting_image_path,
                    _course_video_path: process.env.course_setting_video_path,
                    _data: result
                }

                response.send(output);
            })
            .catch(() => {
                const output = {
                    _status: false,
                    _message: "No Record Found",
                    _data: null
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

exports.destroy = async (request, response) => {
    try {
        await courseModal.deleteOne({
            _id: request.body.id
        }, {
            $set: {
                deletedAt: Date.now(),
            }
        })
            .then((result) => {
                const output = {
                    _status: true,
                    _message: 'Record Deleted',
                    _data: result
                }
                response.send(output);
            })
            .catch((error) => {
                const output = {
                    _status: false,
                    _message: 'Record not Deleted',
                    _error: error.message,
                    _data: null
                }
                response.send(output);
            })
    }
    catch (error) {
        const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        }

        response.send(output);
    }
}