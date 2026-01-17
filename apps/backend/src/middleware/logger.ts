import { Request, Response, NextFunction } from "express";
import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`${req.method} ${req.path}`);
  next();
};
