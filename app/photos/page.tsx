"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPhotos } from "@/lib/services";
import { Photo } from "@/db/schema";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";

const PhotosPage = () => {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        setError("");
        const photosData = await getPhotos();
        setPhotos(photosData);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setError("Failed to load photos. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const handlePhotoClick = (photoId: number) => {
    router.push(`/photos/${photoId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="No Photos Found"
          description="There are no photos in the gallery yet. Start by creating an album and adding some photos."
          //   actionText="View Albums"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Photo Gallery
          </h1>
          <p className="text-gray-600">
            Explore all photos from our community. Click on any photo to view
            details.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Total Photos: {photos.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border"
              onClick={() => handlePhotoClick(photo.id)}
            >
              <div className="p-4">
                <div className="flex flex-col  gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      //   onError={(e) => {
                      //     const target = e.target as HTMLImageElement;
                      //     target.src = "/placeholder.jpg";
                      //   }}
                    />
                  </div>
                  <div className="flex-1 mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                      {photo.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Uploaded:{" "}
                      {new Date(photo.uploadedAt!).toLocaleDateString()}
                    </p>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/photos/${photo.id}/edit`);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePhotoClick(photo.id);
                        }}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotosPage;
