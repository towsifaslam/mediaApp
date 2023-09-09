import mongoose from "mongoose";
import verification from "../models/emailVerification.js";
import Users from "../models/userModel.js";
import {compareString}from'../ults/index.js'
export const VerifyEmail = async(req,res)=>{
  const {userId,token:hashToken} = req.params
  try {
 const result = await verification.findOne({userId})
  
    if(result){
      const {createdAt,token} = result
      if(createdAt<Date.now()){
         verification.findOneAndDelete({userId})
                     .then(()=>{
                      Users.findByIdAndDelete({_id: userId})
                       .then(()=>{
                        const message = 'Verification token has expired'
                        res.redirect(`/users/verified?status=error&message=${message}`)
                      })
                      .catch((error)=>{
                        res.redirect(`/users/verified?status=error&message=`)
                      })
                     })
      }
      else{
        // token valid 
       compareString(token,hashToken)
                    .then((isMatch)=>{
                      if(isMatch){
                        
                      }
                      else{}
                    })
                    .catch((error)=>{
                      console.log(error)
                      res.redirect(`/users/verified?message=`)
                    })
      
      }
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({message: error.message})
    
  }
}