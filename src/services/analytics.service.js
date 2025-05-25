import Subscription from "../models/subscription.model.js";

export const getStatsByUser = async (userId) => {
  return await Subscription.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: "$status",
        totalCount: { $sum: 1 },
        totalSpending: { $sum: "$price" },
      },
    },
  ]);
};

export const getCategoryBreakdown = async (userId) => {
  return await Subscription.aggregate([
    { $match: { user: userId, status: "active" } },
    {
      $group: {
        _id: "$category",
        totalSpending: { $sum: "$price" },
        count: { $sum: 1 },
      },
    },
  ]);
};

export const getMonthlyTrends = async (userId) => {
  // Complex aggregation for trends
  return await Subscription.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: { month: { $month: "$startDate" }, year: { $year: "$startDate" } },
        totalSpending: { $sum: "$price" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);
};
