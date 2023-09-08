import mongoose,{Schema} from "mongoose";

const emailVerifactionSchema = Schema({
  userId:String,
  token:String,
  createdAt:Date,
  expiresAt:Date,
})

const verification = mongoose.model('verification',emailVerifactionSchema);
export default verification;