import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { userInfo } from "os";
import jwt from "jsonwebtoken";
import { z } from "zod";

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
    "super-secret"
  );
};

const jwtInfoSchema = z.object({
   email: z.string().email(),
   iat: z.number(),
});

export const getDataFromAuthToken = (token?: string) => {
  if (!token) return false;
  try {
    return jwtInfoSchema.parse(jwt.verify(token, "super-secret"));
  } catch (e) {
    console.error(e);
    return null;
  }
};
