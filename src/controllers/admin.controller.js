import User from "../models/user.model.js";
import Subscription from "../models/subscription.model.js";

export const getSystemStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSubscriptions = await Subscription.countDocuments();
    
    const revenueStats = await Subscription.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: null, totalRevenue: { $sum: "$price" } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalSubscriptions,
        totalRevenue: revenueStats[0]?.totalRevenue || 0
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsersAdmin = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};
