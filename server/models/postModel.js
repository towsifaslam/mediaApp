import mongoose,{Schema} from "mongoose";


//Schema 
const postSchema = new mongoose.Schema(
  {
    userId:{type:Schema.Types.ObjectId,ref:'Users'},
    descriptino:{type:String,required:true},
    image:{type:String},
    likes:[{type:String}],
    comments:[{type:Schema.Types.ObjectId,ref:'Comments'}]
  },
  {timestamps:true}
)

const Posts = mongoose.model('Posts',postSchema);
export default Posts;