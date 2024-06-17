
import bcrypt from "bcrypt";

export const register = async (req, res) => { 
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
};

export const login = async (req, res) => { 

};

export const logout = async (req, res) => { 

};