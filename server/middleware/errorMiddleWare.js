const errorMiddleWare =(err,req,res,next)=>{
  const defaultError = {
    statusCode: 404,
    success: 'failed',
    messsage:err
  }
  if(err.messsage === 'ValidationError'){
    defaultError.statusCode = 404;
    defaultError.messsage = Object.values(err,errors)
      .map((el)=>el.messsage).join(",")
  }
  if(err.code && err.code === 11000){
    defaultError.statusCode =404;
    defaultError.messsage = `${Object.values(err.keyValue)} field has to be unique`
  }
  res.status(defaultError.statusCode).join({
    success: defaultError.success,
    message: defaultError.messsage
  })
}
export default errorMiddleWare;