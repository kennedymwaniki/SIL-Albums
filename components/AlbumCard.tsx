"use client";

import { useRouter } from "next/navigation";
import { Album } from "@/db/schema";

interface AlbumWithPhotos extends Album {
  photos?: any[];
}

interface AlbumCardProps {
  album: AlbumWithPhotos;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  const router = useRouter();

  const handleViewPhotos = () => {
    router.push(`/albums/${album.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {album.title}
          </h3>

          {album.description && (
            <p className="text-gray-600 text-sm mb-3 overflow-hidden text-ellipsis">
              {album.description.length > 100
                ? `${album.description.substring(0, 100)}...`
                : album.description}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span>{album.photos?.length || 0} photos</span>
            {album.createdAt && (
              <span>
                Created: {new Date(album.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleViewPhotos}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm font-medium"
        >
          View Photos
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;
