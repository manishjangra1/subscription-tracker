import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("Please upload a file");
      error.statusCode = 400;
      throw error;
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "sub-tracker/profiles",
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePicture: result.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
