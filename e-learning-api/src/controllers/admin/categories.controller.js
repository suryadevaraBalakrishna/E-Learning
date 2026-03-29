const categoriesModal=require('../../models/Categories');
require('dotenv').config();
var slugify = require('slugify');

exports.create=async(request,response)=>{

    try{
       var slug_detail = slugify(request.body.name, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: true,
        locale: 'vi',
        trim: true
    })

    const data={
        name:request.body.name,
        image:request.file.filename,
        order:request.body.order,
        slug:slug_detail
    }

    const insertData=new categoriesModal(data);
    await insertData.save()
    .then((result)=>{
          const output = {
                    _status: true,
                    _message: "Record inserted successfully",
                    _data: result,
                }

                response.send(output);
    })
    .catch((error)=>{
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
    catch(error){
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


exports.update = async (request, response) => {
    try {
         var slug_detail = slugify(request.body.name, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: true,
        locale: 'vi',
        trim: true
    })

        const data = {
              name: request.body.name,
            order: request.body.order,
            slug:slug_detail
        }

        if (request.file) {
            data.image = request.file.filename;
        }

        await categoriesModal.updateOne({
            _id: request.params.id
        }, {
            $set: data
        }).then((result) => {
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


exports.details=async(request,response)=>{
    try{
       await categoriesModal.findById({
        _id:request.body.id
       })
       .then((result)=>{
           const output = {
                    _status: true,
                    _message: "Record Found",
                     _categories_image_path: process.env.categories_setting_image_path,
                    _data: result
                }

                response.send(output);
       })
       .catch(()=>{
           const output = {
                    _status: false,
                    _message: "No Record Found",
                    _data: null
                }

            response.send(output);
       })
    }
    catch(error){
          const output = {
            _status: false,
            _message: "something went wrong",
            _error: error.message,
            _data: null
        }

        response.send(output);
    }
}

exports.destroy=async(request,response)=>{
    try{
       await categoriesModal.deleteOne({
        _id:request.body.id
       },{
         $set: {
                deletedAt: Date.now(),
        }
       })
       .then((result)=>{
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
    catch(error){
        const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        }

        response.send(output);
    }
}
