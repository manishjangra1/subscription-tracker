import { v4 as uuidv4 } from "uuid";

const correlationMiddleware = (req, res, next) => {
  const correlationId = req.header("X-Correlation-ID") || uuidv4();
  req.correlationId = correlationId;
  res.setHeader("X-Correlation-ID", correlationId);
  next();
};

export default correlationMiddleware;
