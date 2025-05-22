import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    action: {
      type: String,
      required: true,
    },
    ip: String,
    userAgent: String,
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);
export default AuditLog;
