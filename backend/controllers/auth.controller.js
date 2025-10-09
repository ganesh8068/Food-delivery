import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";

const signUp = async (req, res) => {
  try {
    const { fullname, email, password, mobile, role } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exist." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters." });
    }

    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "mobile No. must be at least 10 digits." });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullname,
      email,
      role,
      mobile,
      password: hasedPassword,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(`sign up error ${error}`);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "password is wrong, enter correct password." });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`sign in error ${error}`);
  }
};

const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "log out successfully" });
  } catch (error) {
    return res.status(500).json(`sign out error ${error}`);
  }
};
export { signIn, signUp, signOut };
