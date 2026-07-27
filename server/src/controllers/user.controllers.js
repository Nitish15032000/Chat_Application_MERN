import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `current user error ${error}` });
  }
};

export const editProfile = async (req, res) => {
  try {
    let { name } = req.body;
    let image;

    if (req.file) {
      try {
        image = await uploadOnCloudinary(req.file.path);
      } catch (uploadError) {
        console.error("Profile image upload failed:", uploadError);
        image = "";
      }
    }

    let updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (image !== undefined) {
      updateData.image = image;
    }

    let user = await User.findByIdAndUpdate(req.userId, updateData, { new: true });

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Profile upload error:', error)
    const message = error?.message || JSON.stringify(error)
    const status = error?.http_code || 500
    return res.status(status).json({ message: `profile error: ${message}` })
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    let users = await User.find({
      _id: { $ne: req.userId },
    }).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `get other users error ${error}` });
  }
};

export const search = async (req, res) => {
  try {
    let { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "query is required" });
    }
    let users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `search users error ${error}` });
  }
};
