import nodemailer from'nodemailer';
import dotenv from'dotenv'
import {v4 as uuidv4}from'uuid';
import {hashString}from'./index.js'
import Verification from'../models/emailVerification.js';
dotenv.config();

const {AUTH_EMAIL,AUTH_PASSWORD,APP_URL } = process.env;

let transporter = nodemailer.createTestAccount({
  host: 'smtp-mail.outlook.com',
  auth:{
    user:AUTH_EMAIL,
    pass: AUTH_PASSWORD
  }
})

export const sendVerificationEmail = async(user,res)=>{
  const {_id,email,lastName} = user
  const token = _id+ uuidv4();
  const link = APP_URL + 'users/verify/'+_id+'/'+token;
  

  // mail option 
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: 'Email Verification',
    html: `<div>

    <h1>Please verfy your email adress</h1>
    <hr>
    <h4>hi ${lastName}</h4>
    <p> please verify your email adree <br>
    <p>this is <b>expri in hors </b></p>
    </p>
    <a href=${link} > email </a> 
    </div>
    `
  }

  try {
     const hashToken = await hashString(token)
     const  newVerifiedEmail = await Verification.create({
      user: _id,
      token: hashToken,
      createAt: Date.now(),
      expiresAt: Date.now()+3600000
     })
     if(newVerifiedEmail){
     await transporter
              .sendMail(mailOptions)
             .then(()=>{
              res.status(201).send({
                success: 'Pending',
                message: 'verification email has been sent to your account check your email for '
              })
             })
             .catch((err)=>{
              console.log(err)
              res.status(404).json({message: 'Something went wrong'})
             })
              
     }
  } catch (error) {
     console.log(error);
     res.status(404).json({message: 'Somthing wennt wrong'})
  }
}