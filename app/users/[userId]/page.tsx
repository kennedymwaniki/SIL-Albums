export const dynamic = "force-dynamic"; // This page should always be dynamic
import { useParams } from "next/navigation";
import AlbumForm from "@/components/AlbumForm";
import UserAlbums from "@/components/UserAlbums";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getUserById } from "@/lib/services";
import { User, Album } from "@/db/schema";

interface UserWithAlbums extends User {
  albums: Album[];
}

const UserPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const user = await getUserById(Number(userId));

  const handleABlumCreated = () => {
    // This function can be used to refresh the albums list after creating a new album
    // For now, we will just log a message
    console.log("Album created successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center space-x-4 mb-6">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={`${user.firstname}'s avatar`}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xl">
                {user.firstname.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.firstname} {user.lastname}
            </h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500 text-sm">
              Member since {new Date(user.createdAt!).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <AlbumForm userId={Number(userId)} />

      <UserAlbums albums={user.albums} />
    </div>
  );
};

export default UserPage;
