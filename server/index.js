import express  from "express";
import dotenv from'dotenv'
import cors from'cors'
import morgan from "morgan";
import bodyParser from "body-parser";


//securty packages
import helmet from'helmet'
import mongoose from "mongoose";
import errorMiddleWare from "./middleware/errorMiddleWare.js";
import router from "./routes/index.js";

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8800;

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'))
// error middleware
app.use(errorMiddleWare)
app.use(router)
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  app.listen(PORT,()=>{
    console.log(`server is runnig on port and connection mongodb :${PORT}`)
  })
})
.catch(err=>console.log(err))
