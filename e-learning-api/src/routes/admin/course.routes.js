const express = require('express');
const router = express.Router();
const multer = require('multer');
const { create, update, details, destroy, view } = require('../../controllers/admin/course.controller');
const path = require('path');

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {

            if (file.fieldname === "image") {
                cb(null, "uploads/course"); // image folder
            }
            else if (file.fieldname === "video") {
                cb(null, "uploads/course-video"); // video folder
            }

        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage: storage });

    router.post('/create', upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 }
    ]), create);
    router.post('/view', upload.none(), view)
    router.post('/update/:id', upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'video', maxCount: 1 }
    ]), update);
    router.post('/details', upload.none(), details);
    router.post('/delete', upload.none(), destroy);





    server.use('/api/admin/course', router);
}