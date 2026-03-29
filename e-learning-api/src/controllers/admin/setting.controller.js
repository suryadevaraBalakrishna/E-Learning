const settingModal = require('../../models/Setting');
require('dotenv').config();

exports.create = async (request, response) => {
    try {
        const data = {
            sitename: request.body.sitename,
            logo: request.file.filename,
            phone: request.body.phone,
            email: request.body.email,
        }

        const setting = new settingModal(data);
        await setting.save()
            .then((result) => {
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
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        }

        response.send(output);
    }
}


exports.view = async (request, response) => {
    try {
        await settingModal.findOne()
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record found successfully",
                    _setting_image_path:process.env.website_setting_image_path,
                    _data: result
                }
                response.send(output);

            })
            .catch(() => {
                const output = {
                    _status: false,
                    _message: 'No Record Found',
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


exports.update = async (request, response) => {
    try {

        const setting = await settingModal.findOne();

        if (!setting) {
            return response.send({
                _status: false,
                _message: "Settings not found",
                _data: null
            });
        }

        // Update fields
        setting.sitename = request.body.sitename;
        setting.phone = request.body.phone;
        setting.email = request.body.email;

        if (request.file) {
            setting.logo = request.file.filename;
        }

        await setting.save();

        response.send({
            _status: true,
            _message: "Record updated successfully",
            _data: setting
        });

    } catch (error) {
        response.send({
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null
        });
    }
};
