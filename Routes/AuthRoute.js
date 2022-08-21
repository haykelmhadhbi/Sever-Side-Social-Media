import express from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js";

const router = express.Router()

router.post('/register', registerUser)
router.post('/login',loginUser )

//whenever we wante to send some data for ther server we use the post resquest and inside i make a router with name resgister and it wil call a function register user from the controller 
//router.get('/', async(req,res)=>{res.send("yemchi jawo behi Auth Route")})
export default router 