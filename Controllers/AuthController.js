import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'

//registering a new user 
export const registerUser = async(req,res)=> {
    const {username , password , firstname , lastname}= req.body;//user passs data in our server 
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt)

    const newUser = new UserModel ({username, password: hashedPass , firstname , lastname  })// ihave maped all these fields isnide the  UserModel
    //its time to save newUser in our database
    try {
        await newUser.save()//it will pass all the functionality of a function until a new user will be saved in database
        res.status(200).json(newUser) // if will be saved it will send us a response a status code if 200

    }catch (error ){
        res.status(500).json({message : error.message})//500 represent the error in our server 

    }

}


// login User

export const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username: username})


        if(user)
        {
            const validity = await bcrypt.compare(password, user.password)


            validity? res.status(200).json(user): res.status(400).json("Wrong Password")
        }
        else{
            res.status(404).json("User does not exists")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

