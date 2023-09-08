import Users from'../models/userModel.js';
import {compareString, createJTW, hashString}from'../ults/index.js'
import { sendVerificationEmail } from '../ults/sendEmail.js';

export const register = async(req,res,next)=>{
  const {firstName,lastName,email,password} = req.body
  
  //validate fileds
  if(!(firstName || lastName || email || password))
  {
    next("Provide Required Fields");
    return;
  }
  try {
    const userExist = await Users.findOne({email})
    if(userExist){
      next('Email Address already exists');
      return;
    }
    const hashedPassword = await hashString(password)
     
    // create user 
    const user = await Users.create({
      firstName,
      lastName,
      email,
      password,hashedPassword
    })

    sendVerificationEmail(user,res)
  } catch (error) {
    console.log(error)
    res.status(404).json({message: error.message})
  }
}


export const login = async(req,res,next)=>{
  const {email,password} = req.body;
  try {
    // validate 
    if(!(email || password)){
      next('Please Provide user creadentials')
      return;
    }
    // fide user by email
    const user = await Users.findOne({email}).select('+password').populate({
      path: 'friends',
      select: 'firstName lastName location profileUrl -password'
    })
    if(!user){
      next("Invalild email or password")
      return;
    }
   
   if(!user?.veryfied){
    next("user email is verifed , check your accout and verify yor email please ")
    return; 
   }

   // compear password 
   const isMatch = await compareString(password,user?.password);
    if(!isMatch){
      next('Invalid email or password')
      return;
    }
    user.password = undefined;
    const token = createJTW(user?._id)
    
    res.status(201).json({
      success: true,
      message: 'Loging Successfully',
      user,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(404).json({message: error.message})
  }
}