var jwt = require('jsonwebtoken');


let generatetoken=async function(data){
    try{
        let finalData=JSON.stringify(data);
        let token=jwt.sign(finalData,"KUSHAGRAGUPTA");
        return token
    }
    catch(error){
        console.log(error);
    }
};


module.exports=generatetoken;