require('dotenv').config()
const order = require('../../models/Order');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { request } = require('express');
const saltRounds = 10;
const nodemailer = require("nodemailer");

const Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: 'rzp_test_S7zG0ylca2nnea',
    key_secret: 'X5hDBpwvcqeOCez8f47svUyI',
});





//order Placed API
exports.orderPlaced = async (request, response) => {


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

        var total_records = await order.countDocuments();

        const data = request.body
        data.user_id = decoded.userData._id;
        data.order_number = 'ELEARNING_00' + (total_records + 1);

        try {

            const insertData = new order(data);
            await insertData.save()
                .then(async (result) => {


                    var orderInfo = await instance.orders.create({
                        "amount": request.body.net_amount * 100,
                        "currency": "INR",
                        "receipt": result._id,
                        "partial_payment": false,
                    })

                    await order.updateOne({
                        _id: result._id
                    }, {
                        $set: {
                            order_id: orderInfo.id
                        }
                    })

                    var orderData = await order.findById(result._id);

                    const output = {
                        _status: true,
                        _message: 'Order Placed',
                        orderInfo: orderInfo,
                        _data: orderData
                    }

                    response.send(output);

                })
                .catch((error) => {

                    console.log(error, 'first');

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

        } catch (error) {
            const output = {
                _status: false,
                _message: 'Something went wrong!',
                _data: error.message
            }

            response.send(output);
        }



    } catch (error) {
        const output = {
            _status: false,
            _message: 'Invalid Token',
            _data: error.message
        }

        return response.send(output);
    }

}



//change Status
exports.changeStatus = async (request, response) => {

    var payment_info = await instance.payments.fetch(request.body.payment_id);

    if (payment_info.status == 'captured') {
        var orderdata = {
            payment_id: request.body.payment_id,
            payment_status: 2,
            order_status: 2,
        }
    } else {
        var orderdata = {
            payment_id: request.body.payment_id,
            payment_status: 3,
            order_status: 3,
        }
    }


    await order.updateOne({
        order_id: request.body.order_id
    }, {
        $set: orderdata
    }).then(async () => {

        var orderInfo = await order.findOne({ order_id: request.body.order_id })
        const output = {
            _status: true,
            _message: 'order status changed successfully',
            _data: orderInfo
        }

        return response.send(output);

    }).catch(() => {
        const output = {
            _status: false,
            _message: 'something went wrong',
            _data: null
        }

        return response.send(output);
    })


}


//my order
// Fetch orders for logged-in user
exports.myOrders = async (request, response) => {

  let token = request.headers.authorization;

  if (!token) {
    return response.send({
      _status: false,
      _message: 'No Token Provided',
      _data: null
    });
  }

  token = token.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.KEY_VALUE);

    const orders = await order
      .find({ user_id: decoded.userData._id })
      .sort({ createdAt: -1 });

    return response.send({
      _status: true,
      _message: 'Orders fetched successfully',
      _data: orders
    });

  } catch (error) {
    return response.send({
      _status: false,
      _message: 'Invalid Token',
      _data: null
    });
  }
};