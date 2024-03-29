import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { userInfo } from "os";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/db.setup";

const saltRounds = 11;

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

export const createUnsecuredUserInformation = (user: User) => {
  return {
    email: user.email,
  };
};

export const createTokenForUser = (user: User) => {
  return jwt.sign(
    createUnsecuredUserInformation(user),
    process.env.JWT_SECRET!
  );
};

const jwtInfoSchema = z.object({
   email: z.string().email(),
   iat: z.number(),
});

export const getDataFromAuthToken = (token?: string) => {
  if (!token) return false;
  try {
    return jwtInfoSchema.parse(jwt.verify(token, process.env.JWT_SECRET!));
  } catch (e) {
    console.error(e);
    return null;
  }
};


export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    // JWT Handling Stuff 👇👇
    const [, token] = req.headers.authorization?.split?.(" ") || [];
    const myJwtData = getDataFromAuthToken(token);
    if (!myJwtData) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // this checks user is in database
    const userFromJwt = await prisma.user.findFirst({
      where: {
        email: myJwtData.email,
      },
    });

    if (!userFromJwt) {
      return res.status(401).json({ message: "User not Found" });
    }

    (req as any).user = userFromJwt;
    next();
    // JWT Handling Stuff 👆👆
};