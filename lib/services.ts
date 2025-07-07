// "use server";

import { User } from "@/db/schema";

const getBaseUrl = () => {
  return (
    process.env.NEXTAUTH_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3001")
  );
};

export const getUser = async (email: string): Promise<User | null> => {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/users/findByEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data; // Extract data from the API response
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Re-throw the original error
  }
};

//get all users
export const getAllUsers = async () => {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the original error
  }
};

//  get all photos
export const getAllPhotos = async () => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/photos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error; // Re-throw the original error
  }
};

// get all albums
export const getAllAlbums = async () => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/albums`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw error; // Re-throw the original error
  }
};

// Get user by ID
export const getUserById = async (userId: string | number) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/users/${userId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    return result.data; // Extract data from the API response
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Get albums by user ID
export const getAlbumsByUserId = async (userId: string | number) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/albums?userId=${userId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching albums by user ID:", error);
    throw error;
  }
};

// Get album by ID
export const getAlbumById = async (albumId: string | number) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/albums/${albumId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching album by ID:", error);
    throw error;
  }
};

// Get photos by album ID
export const getPhotosByAlbumId = async (albumId: string | number) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/photos?albumId=${albumId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching photos by album ID:", error);
    throw error;
  }
};

// Get photo by ID
export const getPhotoById = async (photoId: string | number) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/photos/${photoId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching photo by ID:", error);
    throw error;
  }
};

// Update photo
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
    return await response.json();
  } catch (error) {
    console.error("Error updating photo:", error);
    throw error;
  }
};

// Create album
export const createAlbum = async (data: {
  userId: number;
  title: string;
  description: string;
}) => {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/albums`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error creating album:", error);
    throw error;
  }
};

export const getPhotos = async () => {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/photos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};
