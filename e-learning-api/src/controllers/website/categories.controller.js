const categoriesModal=require('../../models/Categories');
require('dotenv').config();
var slugify = require('slugify');

exports.view = async (request, response) => {
    try {
        await categoriesModal.find({ deletedAt: null })
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record Found",
                    _categories_image_path: process.env.categories_setting_image_path,
                    _data: result
                }

                response.send(output);

            })
            .catch(() => {
                const output = {
                    _status: false,
                    _message: "No record found",
                    _data: null,
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






