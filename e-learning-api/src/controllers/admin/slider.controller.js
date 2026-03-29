const { request } = require('express');
const SliderModal = require('../../models/Slider');
require('dotenv').config();

exports.create = async (request, response) => {
    try {
        const data = {
            image: request.file.filename,
            subheading: request.body.subheading,
            heading: request.body.heading,
            description: request.body.description,
            button_txt: request.body.button_txt,
            button_link: request.body.button_link,
            button_txt_two: request.body.button_txt_two,
            button_link_two: request.body.button_link_two,
        }

        const slider = new SliderModal(data);
        await slider.save()
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record inserted",
                    _data: result
                }
                response.send(output);

            })
            .catch((error) => {
                var errorMessages = [];
                for (err in error.errors) {
                    errorMessages.push(error.errors[err].message);
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
        await SliderModal.find({ deletedAt: null })
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record Found",
                    _slider_image_path: process.env.slider_setting_image_path,
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
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        }

        response.send(output);
    }
}




exports.update = async (request, response) => {

    try {
        const data = {
            subheading: request.body.subheading,
            heading: request.body.heading,
            description: request.body.description,
            button_txt: request.body.button_txt,
            button_link: request.body.button_link,
            button_txt_two: request.body.button_txt_two,
            button_link_two: request.body.button_link_two,
        }

        if (request.file) {
            data.image = request.file.filename;
        }


        await SliderModal.updateOne({
            _id: request.params.id
        }, {
            $set: data
        })
            .then((result) => {
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

    } catch (error) {
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
        await SliderModal.findById({
            _id: request.body.id
        })
            .then((result) => {
                const output = {
                    _status: true,
                    _message: "Record Found",
                    _slider_image_path: process.env.slider_setting_image_path,
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
        await SliderModal.deleteOne({
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




