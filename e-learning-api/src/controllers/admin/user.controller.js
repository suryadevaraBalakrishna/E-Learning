const userModal = require('../../models/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = 10;
const { json } = require('body-parser');
const { request, response } = require('express');

exports.register = async (request, response) => {

    var existingUser = await userModal.findOne({ email: request.body.email, deletedAt: null, role_type: 'Admin' })

    if (existingUser) {
        const output = {
            _status: false,
            _message: 'Email Already Exists',
            _data: null,
        }
        return response.send(output);
    }

    const data = {
        name: request.body.name,
        email: request.body.email,
        password: await bcrypt.hash(request.body.password, saltRounds),
        mobile_number: request.body.mobile_number,
        image: request.file.filename,
        role_type: 'Admin'
    }

    try {
        const insertData = new userModal(data);
        await insertData.save()
            .then((result) => {
                var token = jwt.sign({ userData: data }, process.env.KEY_VALUE)
                const output = {
                    _status: true,
                    _message: 'User Inserted',
                    _token: token,
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
                    _message: 'Something went wrong!',
                    _data: null,
                    _error_messages: errorMessages
                }

                response.send(output);
            })
    }
    catch (error) {
        const output = {
            _status: false,
            _message: 'Something went wrong!',
            _data: null
        }

        response.send(output);
    }

}

exports.login = async (request, response) => {
    var existingUser = await userModal.findOne({ email: request.body.email, deletedAt: null, role_type: 'Admin' })

    if (!existingUser) {
        const output = {
            _status: false,
            _message: 'Incorrect Email',
            _data: null,
        }
        return response.send(output);
    }

    console.log(existingUser);
     console.log(request.body.password);


    if (await bcrypt.compare(request.body.password, existingUser.password)) {
        var token = jwt.sign({ userData: existingUser }, process.env.KEY_VALUE);
       
        if (existingUser.status == false) {
            const output = {
                _status: false,
                _message: 'Account is deactivated',
                _data: null,
            }
            return response.send(output);
        }

        const output = {
            _status: true,
            _message: 'Login Successful',
            _token: token,
            _data: existingUser
        }

        response.send(output);

    } else {
        const output = {
            _status: false,
            _message: 'Invalid Password',
            _data: null,
        }
        return response.send(output);
    }



}


exports.view = async (request, response) => {
    var token = request.headers.authorization;

    if (!token) {
        const output = {
            _status: false,
            _message: 'No Token Provided',
            _data: null,
        }
        return response.send(output);
    }

    var token = token.split(' ')[1];
    console.log(token);

    try {
        var decoded = jwt.verify(token, process.env.KEY_VALUE);
        var userData = await userModal.findOne({ _id: decoded.userData._id, role_type: 'Admin' });

        if (!userData) {
            const output = {
                _status: false,
                _message: 'User Not Found',
                _data: null
            }

            return response.send(output);
        }

        const output = {
            _status: true,
            _message: 'Profile Fetched Successfuly',
            _token: token,
            _image_path: process.env.user_image,
            _data: userData
        }

        response.send(output);

    }
    catch (error) {
        const output = {
            _status: false,
            _message: 'Invalid Token',
            _data: null,
            _message: error.message,
        }

        return response.send(output);
    }
}

exports.viewUser = async (request, response) => {
    await userModal.find()
        .then((result) => {
            if (result.length > 0) {
                const output = {
                    _status: true,
                    _message: 'Record Found',
                      _image_path: process.env.user_image,
                    _data: result
                }
                response.send(output)
            } else {
                const output = {
                    _status: false,
                    _message: 'No Record Found',
                    _data: null
                }

                response.send(output);
            }
        })
        .catch(() => {
            const output = {
                _status: false,
                _message: 'Something went wrong!',
                _data: null
            }

            response.send(output);
        })

}


exports.updateProfile = async (request, response) => {
    var token = request.headers.authorization;

    if (!token) {
        const output = {
            _status: false,
            _message: 'No Token Provided',
            _data: null,
        }
        return response.send(output);
    }

    var token = token.split(' ')[1];
    console.log(token);

    try {
        var decoded = jwt.verify(token, process.env.KEY_VALUE);
        var userData = await userModal.findOne({ _id: decoded.userData._id, role_type: 'Admin' })

        if (!userData) {
            const output = {
                _status: false,
                _message: 'User Not Found',
                _data: null
            }

            return response.send(output);
        }

        const updateData = request.body;

        if (request.file) {
            updateData.image = request.file.filename;
        }

        var updateUser = await userModal.updateOne({
            _id: decoded.userData._id
        }, {
            $set: updateData
        })
        const output = {
            _status: true,
            _message: 'Profile Updated Successfuly',
            _data: updateUser,
        }

        response.send(output);


    } catch (error) {
        const output = {
            _status: false,
            _message: 'Invalid Token',
            _data: null,
            _message: error.message,
        }

        return response.send(output);
    }


}

exports.changePassword = async (request, response) => {
    var token = request.headers.authorization;

    if (!token) {
        const output = {
            _status: false,
            _message: 'No Token Provided',
            _data: null,
        }
        return response.send(output);
    }

    var token = token.split(' ')[1];
    console.log(token);

    try {
        var decoded = jwt.verify(token, process.env.KEY_VALUE);
        var userData = await userModal.findOne({ _id: decoded.userData._id, role_type: 'Admin' })

        if (!userData) {
            const output = {
                _status: false,
                _message: 'User Not Found',
                _data: null
            }

            return response.send(output);
        }

        var verify_password = await bcrypt.compare(request.body.current_password, userData.password);

        if (!verify_password) {
            const output = {
                _status: false,
                _message: 'Incorrect Password',
                _data: null
            }

            return response.send(output);
        }

        if (request.body.current_password === request.body.new_password) {
            const output = {
                _status: false,
                _message: 'Current Password and New password should not be same',
                _data: null
            }

            return response.send(output);
        }

        if (request.body.new_password != request.body.confirm_password) {
            const output = {
                _status: false,
                _message: 'Confirm Password and New password should be same',
                _data: null
            }

            return response.send(output);
        }

        var password = await bcrypt.hash(request.body.new_password, saltRounds);

        var updateUser = await userModal.updateOne({
            _id: decoded.userData._id
        }, {
            $set: {
                password: password
            }
        })

        const output = {
            _status: true,
            _message: 'Password Updated Successfuly',
            _data: updateUser
        }

        response.send(output);

    }
    catch (error) {
        const output = {
            _status: false,
            _message: 'Invalid Token',
            _data: null
        }

        return response.send(output);
    }


}


exports.forgotPassword=async(request,response)=>{
      var existingUser = await userModal.findOne({ email: request.body.email, deleted_at:null,role_type:'Admin' })

    if (!existingUser) {
        const output = {
            _status: false,
            _message: 'Invalid Email',
            _data: null,
        }
        return response.send(output);
    }

    var token = jwt.sign({ userData: existingUser }, process.env.KEY_VALUE, {
        expiresIn: '1h'
    })

       // For production, replace with your actual SMTP server details.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

     const mailOptions = {
        from: 'Elearning API' + process.env.EMAIL_USER,
        to: existingUser.email,
        subject: "Password Reset Request",
        text: `Click the link to reset your password http://localhost:5173/reset-password?token=${token}`, // Plain-text version of the message
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return response.send({
                _status: false,
                _message: 'Error sending email',
                _data: error
            });
        } else {
            return response.send({
                _status: true,
                _message: 'Password reset email sent successfully',
                _data: null
            });
        }
    });


}


exports.resetPassword=async(request,response)=>{
      var token = request.headers.authorization;

    if (!token) {
        const output = {
            _status: false,
            _message: 'No Token Provided',
            _data: null,
        }
        return response.send(output);
    }

    var token = token.split(' ')[1];
    console.log(token);


    try{
          var decoded = jwt.verify(token, process.env.KEY_VALUE);

        var userData = await userModal.findOne({_id:decoded.userData._id,role_type:'Admin'});
          
        if (!userData) {
            const output = {
                _status: false,
                _message: 'User Not Found',
                _data: null
            }

            return response.send(output);
        }


         if (request.body.new_password != request.body.confirm_password) {
            const output = {
                _status: false,
                _message: 'Confirm Password and New password should be same',
                _data: null
            }

            return response.send(output);
        }

        var password = await bcrypt.hash(request.body.new_password, saltRounds);

          var updateUser = await userModal.updateOne({
            _id: decoded.userData._id
        }, {
            $set: {
                password: password
            }
        })

        const output = {
            _status: true,
            _message: 'Password Reset Successfuly',
            _data: updateUser
        }

        response.send(output);



    } catch (error) {
        const output = {
            _status: false,
            _message: 'Invalid Token',
            _data: null
        }

        return response.send(output);
    }
}