import bcrypt from 'bcrypt'

const saltRounds = 11;

const hashPassword = (password: string) => {

   return bcrypt.hash(password, saltRounds);
}