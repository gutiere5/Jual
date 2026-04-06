import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../secrets";
import { logger, requestLogger } from "../middleware/logger";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  logger.info("Signup request received", email);

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    logger.warn("Signup attempt with existing email", email);
    throw new Error("User already exists");
  }

  user = await prismaClient.user.create({
    data: {
      email,
      username,
      password: hashSync(password, 10),
    },
  });

  if (user) {
    logger.info("User created successfully", email);
    res.status(201).json(user);
  } else {
    throw new Error("User Data Is Not Valid");
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  logger.info("Login request recieved", email);

  const user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new Error("User already exists");
  }

  if (!compareSync(password, user.password)) {
    throw new Error("Incorrect Password!");
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as any,
  });

  res.status(200).json({ user, token });
});
