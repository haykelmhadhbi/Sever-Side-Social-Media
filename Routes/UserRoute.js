import  express from "express";
import { getUser, updateUser,deleteUser, followUser, UnFollowUser } from "../Controllers/UserController.js";
const router = express.Router (); //instance router from our server 
router.get('/:id', getUser) //we are not sending any type of data we are jus sinding the id for user and wihch is also no in the body of request  it is in the url of the request so we put a get request ;)
//when we wante to get somthing we should write router.get
router.put('/:id', updateUser)//when we would update somthing we should write router .put 
router.delete('/:id', deleteUser)
router.put ('/:id/follow', followUser)// we save all ther in thunderclient 
router.put('/:id/unfollow', UnFollowUser)



//router.get('/', async(req,res)=>{res.send("user router")})

export default router ; 