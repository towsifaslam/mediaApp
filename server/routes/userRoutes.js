import express from'express'
import path from'path'
import { VerifyEmail } from '../controllers/userController.js'


const router = express.Router()
const __Dirname = path.dirname(path.dirname(''))

router.get('/verify/:userId/:token',VerifyEmail)