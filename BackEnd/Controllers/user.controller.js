import User from "../Models/user.model.js";
import bcrpt from "bcryptjs";

export const getUserByIdController = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      next(404, "User not found with given id");
    }

    return res.status(201).json(user);
  } catch (error) {
    next(error); 
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.clearCookie("access_token");
    res.status(200).json({ message: "User deleted successfully" });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    const updateUser = await User.findOneAndUpdate({_id: req.params.id}, req.body, {
      new: true,
    });
    res.status(201).json(updateUser);
    return;
  } catch (error) {
    next(error);
  }
};
