import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignUpController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isUserExist = await User.findOne({email})
    if(isUserExist){
       return res.status(401).json({ message: "User already exist" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password is not valid" });
    }
    const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET);

    const {password: hashedPassword, ...rest} = isUserExist._doc
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000),
      })
      .status(201)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
