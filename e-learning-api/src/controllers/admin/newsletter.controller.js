const Newsletter=require('../../models/Newsletter');
require('dotenv').config();

exports.view=async(request,response)=>{
    try{
        await Newsletter.find()
        .then((result)=>{
            if(result.length>0){
                const output={
                    _status:true,
                    _message:"Record found",
                    _data:result,
                }
                response.send(output);
            }
        })
        .catch(()=>{
            const output={
                _status:false,
                _message:"No record found",
                 _data:null,    
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