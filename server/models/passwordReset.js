import mongoose,{Schema} from "mongoose";

const passwordResetSchema = Schema({
  userId: {type: String, unique: true},
  email:{type: String, unique: true},
  token: String,
  createAt:Date,
  expiresAt: Date,
})

const posswordReset = mongoose.model('PasswordReset',passwordResetSchema);
export default posswordReset;