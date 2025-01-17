export const generateToken=(user,message,statusCode,res)=>{
    const token =user.getJwtToken();
    res.status(statusCode).
    cookie("token",token,{
        expires :new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly:true})
    //user: user
    .json({
        success:true,
        message,
        token,
        user,
        });
};
