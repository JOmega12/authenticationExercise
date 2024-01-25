import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { userInfo } from 'os';
import jwt from "jsonwebtoken";


const saltRounds = 11;

export const encryptPassword = (password: string) => {

   return bcrypt.hash(password, saltRounds);
}

export const createUnsecuredUserInformation = (user: User) => {
   return {
      email: user.email,
   }
}

export const createTokenForUser = (user: User) => {


   return jwt.sign(createUnsecuredUserInformation(user), 'super-secret');
}