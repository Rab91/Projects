const sendJsonResponse = (status = 200, success =false,message, res)=>{
    return res.status(status).json({success:success, message: message})
}

export {sendJsonResponse}