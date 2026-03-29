const { request } = require('express');
const MenuModal=require('../../models/Menu');
require('dotenv').config();

exports.create=async(request,response)=>{
 try{
    const data={
        name:request.body.name,
        slug:request.body.slug,
        link:request.body.link,
        parentId:request.body.parentId ? request.body.parentId : null,
        order:request.body.order,
        status:request.body.status,
    }

    const menu=new MenuModal(data);
    await menu.save()
    .then((result)=>{
        const output={
            _status:true,
            _message:"Record inserted successfully",
            _data:result,
        }
        response.send(output);
    })
    .catch((error)=>{
       var errorMessage=[];
       for (err in error.errors){
        errorMessage.push(error.errors[err].message);
       }
       const output={
        _status:false,
        _message:"Record not inserted",
        _error:errorMessage,
        _data:null,
       }
       response.send(output);
    })       

    

 } catch(error){
    const output={
        _status:false,
        _message:"Something went wrong",
        _error:error.message,
        _data:null,
    }

    response.send(output);
 }  



}

exports.view = async (request, response) => {
    try {

        const id = request.body?.id;
        let result;
        let output;

        // 🔹 If ID exists → fetch single record
        if (id) {

            result = await MenuModal.findOne({ _id: id });

            if (result) {
                output = {
                    _status: true,
                    _message: "Record found",
                    _data: result,
                };
            } else {
                output = {
                    _status: false,
                    _message: "Record not found",
                    _data: null,
                };
            }

            return response.send(output);
        }

        // 🔹 If no ID → fetch all records
        result = await MenuModal.find({ deletedAt: null });

        if (result && result.length > 0) {
            output = {
                _status: true,
                _message: "Record found",
                _data: result,
            };
        } else {
            output = {
                _status: false,
                _message: "No records found",
                _data: [],
            };
        }

        return response.send(output);

    } catch (error) {

        const output = {
            _status: false,
            _message: "Something went wrong",
            _error: error.message,
            _data: null,
        };

        response.send(output);
    }
}


exports.update=async(request,response)=>{
    try{
         const data={
        name:request.body.name,
        slug:request.body.slug,
        link:request.body.link,
        parentId:request.body.parentId ? request.body.parentId : null,
        order:request.body.order,
        status:request.body.status,
    }

        await MenuModal.updateOne({
            _id:request.params.id,
        },{
            $set:data,
        })
        .then((result)=>{
              const output = {
                    _status: true,
                    _message: 'Record Updated',
                    _data: result
                }

                response.send(output);
        })
        .catch((error)=>{
                const output = {
                    _status: false,
                    _message: 'Record not Updated',
                    _error: error.message,      
                    _data: null
                }   
                response.send(output);
        })
    }
    catch(error){
        const output={
            _status:false,
            _message:"Something went wrong",
            _error:error.message,           
            _data:null,
        }
        response.send(output);
    }
}






exports.destroy=async(request,response)=>{
    try{
        await MenuModal.deleteOne({
            _id:request.body.id,
        },{
            $set:{
                deletedAt:Date.now(),
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
        .catch((error)=>{
            const output={
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