import { connectToDB } from '@utils/database';
import User from '@models/User';
import bcrypt from 'bcrypt';

export const POST = async (req) => {
  const { name, email, password } = await req.json();

  try {
    await connectToDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword
    }); 

    return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
};