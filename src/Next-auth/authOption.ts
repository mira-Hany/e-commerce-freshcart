import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  providers: [
    Credentials({
      name: "signin",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter your email",
        },

        password: {
          label: "Password",
          type: "password",
          placeholder: "enter your password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok || !data.token) {
          return null;
        }

        const decoded = jwtDecode<{ id?: string }>(data.token);

        if (!decoded?.id) {
          return null;
        }

        return {
          id: decoded.id,
          email: credentials.email,
          name: data.user?.name,
          token: data.token,
        };
      },
    }),
  ],

  // session: {
  //   strategy: "jwt",
  // },

  callbacks: {
     jwt({ token, user }) {

      if (user) {
        token.id =user.id 
        token.token=user.token
      }

      return token;
    },

    async session({ session, token }) {


      if(token)
      {
        session.user.id= token.id as string
      }
      return session;
    },
  },

  pages: {
    signIn: "/Login",
  },

  // secret: process.env.NEXTAUTH_SECRET,
};