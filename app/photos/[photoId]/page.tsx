"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPhotoById } from "@/lib/services";
import { Photo } from "@/db/schema";
import LoadingSpinner from "@/components/LoadingSpinner";

const PhotoDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const photoId = params.photoId as string;

  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setIsLoading(true);
        setError("");
        const photoData = await getPhotoById(photoId);
        setPhoto(photoData);
      } catch (error) {
        console.error("Error fetching photo:", error);
        setError("Failed to load photo. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (photoId) {
      fetchPhoto();
    }
  }, [photoId]);

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
            onClick={() => router.back()}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Photo Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The photo you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.back()}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Photo Details</h1>
        </div>

        {/* Photo Display Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Current Photo</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full md:w-48 h-48 object-cover rounded-lg border border-gray-200"
                // onError={(e) => {
                //   const target = e.target as HTMLImageElement;
                //   target.src = "/placeholder.jpg";
                // }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {photo.title}
              </h3>
              <p className="text-gray-600 break-all">{photo.url}</p>
              <p className="text-sm text-gray-500 mt-2">
                Uploaded: {new Date(photo.uploadedAt!).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => router.push(`/photos/${photoId}/edit`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Edit Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailPage;
