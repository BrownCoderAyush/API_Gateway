const axios = require('axios');


const isAuthenticated = async(req,res,next)=>{
    const token = req.headers['x-access-token'];
    console.log(token);
    let data = {
        headers: {
            "x-access-token": token,
            "content-type": "application/json"
        }
    };
    try { 
        const AuthAuthenticationURL = `http://localhost:3001/api/v1/isAuthenticated`;    
        const response = await axios.get(AuthAuthenticationURL , data);
        if(response.data.success){
            next();
        }else{
            return res.status(401).json({
                message : "Unauthorised"
            })
        }
    } catch (error) {

        return res.status(401).json({
            data: {},
            success: false,
            message: "Authentication error invalid or malformed token",
            err: error
        })

    }
}


module.exports = {
    isAuthenticated
}