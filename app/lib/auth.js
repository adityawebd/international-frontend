// import { connect } from "../../utils/config/dbConfig";
import { connect } from "../../utils/config/dbConfig";
// import Customer from "../../utils/models/customer";
import Customer from "../../utils/models/customer";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connect();
          const user = await Customer.findOne({ email });
          console.log("user is", user);
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcryptjs.compare(
            password,
            user.password
          );
          if (!passwordsMatch) {
            return null;
          }
          console.log("matched passwords");
          return user;
        } catch (error) {
          console.log("Error:", error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          await connect();
          const ifUserExists = await Customer.findOne({ email });
          if (ifUserExists) {
            return user;
          }
          const newCustomer = new Customer({
            name: name,
            email: email,
          });
          const res = await newCustomer.save();
          if (res.status === 200 || res.status === 201) {
            console.log(res);
            return user;
          }
        } catch (err) {
          console.log(err);
        }
      }
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        // console.log("user in jwt", user);
        const { _id, firstName, lastName, email, phoneNumber, address, city, postalCode, country, region, timestamp } = user;
        token.id = _id;
        token.name = `${firstName} ${lastName}`;
        token.email = email;
        token.fname = firstName;
        token.lname = lastName;
        token.number = phoneNumber;
        token.address = address;
        token.city = city;
        token.postalCode = postalCode;
        token.country = country;
        token.region = region;
        token.created = timestamp;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.fname = token.fname;
        session.user.lname = token.lname;
        session.user.number = token.number;
        session.user.address = token.address;
        session.user.city = token.city;
        session.user.postalCode = token.postalCode;
        session.user.country = token.country;
        session.user.region = token.region;
      }
      // console.log(session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
