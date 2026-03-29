const sliderModal=require('../../models/Slider');
require('dotenv').config();

exports.view = async (request, response) => {
    try {
        await sliderModal.find({ deletedAt: null })
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
