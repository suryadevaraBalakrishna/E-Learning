const express = require('express');
const router = express.Router();
const multer = require('multer');
const { view, details, relatedCourses } = require('../../controllers/website/course.controller');
const path = require('path');

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, 'uploads/course');
        },
        filename: function (request, file, callback) {
            callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        }
    })

    const upload = multer({ storage: storage });

    
    router.post('/view', upload.none(), view)
    router.post('/details', upload.none(), details);
        router.post('/related', upload.none(), relatedCourses);
   


    server.use('/api/website/course', router);
}