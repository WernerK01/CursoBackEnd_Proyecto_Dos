import bcrypt from "bcrypt"

export const generateHash = (password) => bcrypt.hashSync(password, 10);
export const validateHash = (pass, hash) => bcrypt.compareSync(pass, hash);