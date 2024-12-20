"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  try {
    // Fetch the session cookie
    const session = await cookies().get("appwrite-session");
    console.log("Session Cookie:", session);

    if (!session || !session.value) {
      throw new Error("No session cookie found");
    }

    // Initialize the Appwrite client
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    if (!endpoint || !project) {
      throw new Error(
        "Missing Appwrite environment variables. Ensure NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT are set."
      );
    }

    const client = new Client().setEndpoint(endpoint).setProject(project);
    client.setSession(session.value); // Attach session

    return {
      get account() {
        return new Account(client);
      },
    };
  } catch (error) {
    console.error("Error in createSessionClient:", error);
    throw error; // Rethrow the error for further handling
  }
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    },
  };
}
