
import mongoose, {Schema} from "mongoose";

//schema 
const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required:[true,"First Name is Required"]
  },
  lastName:{
    type:String,
    required:[true,'Last is Required']
  },
  email:{
    type:String,
    required:[true,'Email is Required'],
    unique: true
  },
  password:{
    type:String,
    required:[true,'Password is Required'],
    minlength:[6,'password lentgh shoud be greater than 6 character'],
    select: true,
  },
  location:{type:String},
  profileUrl:{type:String},
  profession:{type:String},
  friends:[{type:Schema.Types.ObjectId,ref:'Users'}],
  viwes:[{type:String}],
  veryfied:[{type:Boolean,default:false}]
},{
  timestamps:true
})

const Users = mongoose.model('Users',userSchema)

export default Users;