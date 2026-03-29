const express = require('express');
const { register,login, view, viewUser, updateProfile, changePassword, forgotPassword, resetPassword } = require('../../controllers/admin/user.controller');
const router = express.Router();
const multer = require('multer')
const uploads = multer({ dest: 'uploads/user' })
const path = require('path');

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/user')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            var imagePath = path.extname(file.originalname);
            console.log(imagePath);
            cb(null, file.fieldname + '-' + uniqueSuffix + imagePath);
        }
    })

    const upload = multer({ storage: storage })


    const singleImage = upload.single('image');

    router.post('/register', singleImage, register);
    router.post('/login',upload.none(),login);
    router.post('/view',upload.none(),view);
    router.post('/view-all',upload.none(),viewUser);
    router.post('/update-profile',singleImage,updateProfile);
    router.post('/change-password',upload.none(),changePassword);
    router.post('/forgot-password',upload.none(),forgotPassword);
    router.post('/reset-password',upload.none(),resetPassword);
    

    server.use('/api/admin/user', router);
}

