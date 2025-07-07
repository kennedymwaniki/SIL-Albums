"use server";
import { revalidatePath } from "next/cache";
import { signIn } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export const createAlbum = async (data: {
  userId: number;
  title: string;
  description: string;
}) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/albums`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    revalidatePath("/users");
    revalidatePath(`/users/${data.userId}`);
    revalidatePath("/albums");
    return await response.json();
  } catch (error) {
    console.error("Error creating album:", error);
    throw error;
  }
};

export const updatePhoto = async (
  photoId: string | number,
  data: { title?: string; url?: string }
) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/photos/${photoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    revalidatePath("/photos");
    revalidatePath(`/photos/${photoId}`);
    revalidatePath("/albums");
    return await response.json();
  } catch (error) {
    console.error("Error updating photo:", error);
    throw error;
  }
};
