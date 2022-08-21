import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";


// get a User
export const getUser = async (req, res) => {//most common in http request in our server because it common for admin and not admin in our application 

    const id = req.params.id;
  
    try {
      const user = await UserModel.findById(id);
  
      if (user) {
        const { password, ...otherDetails } = user._doc;
  
        res.status(200).json(otherDetails);
      } else {
        res.status(404).json("No such user exists");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
  // update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdminStatus, password } = req.body;
  
    if (id === currentUserId || currentUserAdminStatus) {
      try {  //i have to contacte a data bas so i need to try catch 

        if (password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(password, salt);
        }
  
        const user = await UserModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
  
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("Access Denied! you can only update your own profile");
    }
  };
// Delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;
  
    const { currentUserId, currentUserAdminStatus } = req.body;
  
    if (currentUserId === id || currentUserAdminStatus) {
      try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).json("User deleted successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("Access Denied! you can only delete your own profile");
    }
  };

  // Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body; //who wants to follow another user
  //id : the user should be followed
  //and currentUserId : user who wants to follow 

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");//if someone  or wants to follow him or herself then  we should restrict him
  } else {
    try {//interact the data base withe try catch
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {//the user we want to follow of course w'll have some followers lazmmmm
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });//followungUser : the user who wants to follow followUser
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("User is Already followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// UnFollow a User
export const UnFollowUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (followUser.followers.includes(currentUserId)) {//lazmek deja enti mawjoud bro
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User Unfollowed!");
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};



  