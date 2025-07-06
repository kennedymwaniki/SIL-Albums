import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUser } from "./services";
import db from "@/db/db";
import { users } from "@/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: any }) {
      try {
        const existingUser = await getUser(user.email);
        // If user exists, allow sign-in
        if (existingUser) {
          console.log("User exists:", existingUser);
          return true;
        }
        try {
          // Extract first and last name from Google user data
          const nameParts = user.name?.split(" ") || ["User"];
          const firstname = nameParts[0] || "User";
          const lastname =
            nameParts.slice(1).join(" ") ||
            user.email?.split("@")[0] ||
            "Unknown";

          const newUser = await db
            .insert(users)
            .values({
              firstname,
              lastname,
              email: user.email,
              avatarUrl: user.image,
            })
            .returning();

          console.log("Created new user:", newUser[0]);
          return true;
        } catch (createError) {
          console.error("Error creating user:", createError);
          return false; // Prevent sign-in if user creation fails
        }
      } catch (error) {
        // User doesn't exist, create them
        console.error("Error fetching user data:", error);
      }
      return true;
    },
    async session({ session }: { session: any }) {
      try {
        const userData = await getUser(session.user.email);
        session.user.id = userData?.id;
        return session;
      } catch (error) {
        console.error("Error fetching user data for session:", error);
        return session;
      }
    },
  },
  // pages: {
  //   signIn: "/login",
  //   signOut: "/logout",
  // },
});

export const { GET, POST } = handlers;
