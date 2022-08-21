import mongoose from "mongoose";
//we have made a  folder in our server directory 
//javascrip schema that our controllers will use to perform specific kind of functionalities 


const UserSchema = mongoose.Schema( //oblig : meanes you can neglect usernam ya ma3alem in our schema if a user is trying to login or regestring in our application then it must have username propety 
    {
        username: {
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname : {
            type: String,
            required: true
        },
        isAdmin : {
            type: Boolean,
            default: false,
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesin: String,
        worksAt: String,
        relationship: String,
        followers: [] ,// evry user will have some followers so array will store the ids of users who are folling our current 
        following: []
    },
    {timestamps: true}//maaniha each document in our database it will add the tow fields : created and updated 
)

const UserModel= mongoose.model("Users", UserSchema);
export default UserModel