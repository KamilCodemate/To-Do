import express from 'express';
import bcrypt from 'bcrypt';
import uniqid from 'uniqid';
import { databaseDataPost } from '../database';

const signUpRouter = express.Router();

interface UserData {
  id: string;
  fullName: string;
  email: string;
  password: Promise<string> | string;
}

let user: UserData;

signUpRouter.post('/', async (req, res) => {
  console.log('dziala');
  try {
    const userCheckData: Omit<UserData, 'id'> = req.body;
    if (!userCheckData.fullName || !userCheckData.email || !userCheckData.password) {
      return res.json({ success: false, errorContent: 'Fill in all forms' });
    }
    if (typeof userCheckData.password === 'string' && userCheckData.password.length < 8) {
      return res.json({ success: false, errorContent: 'Password should contain at least 8 signs' });
    }
  } catch (err) {
    return res.status(400).json({ success: false, errorContent: 'Something went wrong' });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user = {
      id: uniqid(),
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
    };

    const query = `INSERT INTO users (id, fullname, email, password) VALUES ('${user.id}', '${user.fullName}', '${user.email}', '${user.password}')`;
    let result;
    databaseDataPost(query)
      .then((data: any) => {
        result = data;
      })
      .catch((error: any) => {
        return res.status(400).json({ success: false, errorContent: 'Something went wrong' });
      });

    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, errorContent: 'Something went wrong' });
  }
});

export default signUpRouter;