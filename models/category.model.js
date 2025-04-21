import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
    trim: true,
  },
  color: {
    type: String,
    default: "#000000",
  },
  icon: {
    type: String,
    default: "folder",
  },
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);
export default Category;
