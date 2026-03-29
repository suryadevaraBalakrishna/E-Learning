const express = require('express');
const server = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());

server.use(cors());



server.get('/',(request,response)=>{
    response.send('server is running');
})


//admin api
require('./src/routes/admin/setting.routes')(server);
require('./src/routes/admin/menu.routes')(server);
require('./src/routes/admin/newsletter.routes')(server);
require('./src/routes/admin/slider.routes')(server);
require('./src/routes/admin/service.routes')(server);
require('./src/routes/admin/about.routes')(server);
require('./src/routes/admin/team.routes')(server);
require('./src/routes/admin/categories.routes')(server);
require('./src/routes/admin/course.routes')(server);
require('./src/routes/admin/user.routes')(server);
require('./src/routes/admin/order.routes')(server);
require('./src/routes/admin/dashboard.routes')(server);


//website api
require('./src/routes/website/setting.routes')(server);
require('./src/routes/website/menu.routes')(server);
require('./src/routes/website/newsletter.routes')(server);
require('./src/routes/website/slider.routes')(server);
require('./src/routes/website/service.routes')(server);
require('./src/routes/website/about.routes')(server);
require('./src/routes/website/team.routes')(server);
require('./src/routes/website/categories.routes')(server);
require('./src/routes/website/course.routes')(server);
require('./src/routes/website/user.routes')(server);
require('./src/routes/website/order.routes')(server);

//Image upload
server.use('/uploads/setting',express.static('uploads/setting'));
server.use('/uploads/slider',express.static('uploads/slider'));
server.use('/uploads/service',express.static('uploads/service'));
server.use('/uploads/about',express.static('uploads/about'));
server.use('/uploads/team',express.static('uploads/team'));
server.use('/uploads/categories',express.static('uploads/categories'));
server.use('/uploads/course',express.static('uploads/course'));
server.use('/uploads/course-video',express.static('uploads/course-video'));
server.use('/uploads/user',express.static('uploads/user'));

server.listen(process.env.PORT, () => {
    mongoose.connect(process.env.DB)
        .then(() => console.log('Connected!'))
        .catch((error) => {
            console.log(error);
        })
})