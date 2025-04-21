import Subscription from "../models/subscription.model.js";

export const getSubscriptionSummary = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const stats = await Subscription.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$status",
          totalCount: { $sum: 1 },
          totalSpending: { $sum: "$price" },
        },
      },
    ]);

    const monthlySpending = await Subscription.aggregate([
      { $match: { user: userId, frequency: "monthly", status: "active" } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const yearlySpending = await Subscription.aggregate([
      { $match: { user: userId, frequency: "yearly", status: "active" } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats,
        monthlyTotal: monthlySpending[0]?.total || 0,
        yearlyTotal: yearlySpending[0]?.total || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};
