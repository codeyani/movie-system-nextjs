import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import User from '@models/User';
import { connectToDB } from '@utils/database';

export const options = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            const { email, password } = credentials;
            try {
              await connectToDB();
              const user = await User.findOne({ email: email });
              if (!user || !bcrypt.compareSync(password, user.password)) {
                return null;
              }
              return user;
            } catch (error) {
              console.error('Error during login:', error);
              return null;
            }
          }
        })
      ],
      callbacks: {
        async session({ session }) {
          // store the user id from MongoDB to session
          const sessionUser = await User.findOne({ email: session.user.email });
          session.user.id = sessionUser._id.toString();

          console.log('sessionLogs', session)
          return session;
        },
      },
      pages: {
        signIn: '/'
      }
}