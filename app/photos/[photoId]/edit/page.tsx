"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPhotoById } from "@/lib/services";
import { updatePhoto } from "@/lib/actions";
import { Photo } from "@/db/schema";
import LoadingSpinner from "@/components/LoadingSpinner";

const EditPhotoPage = () => {
  const params = useParams();
  const router = useRouter();
  const photoId = params.photoId as string;

  const [photo, setPhoto] = useState<Photo | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setIsLoading(true);
        setFetchError("");
        const photoData = await getPhotoById(photoId);
        setPhoto(photoData);
        setTitle(photoData.title);
        setUrl(photoData.url);
      } catch (error) {
        console.error("Error fetching photo:", error);
        setFetchError("Failed to load photo. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (photoId) {
      fetchPhoto();
    }
  }, [photoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await updatePhoto(photoId, {
        title: title.trim(),
        url: url.trim(),
      });

      // redirect back to the photo or album page
      router.push(`/photos/${photoId}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating photo:", error);
      setError("Failed to update photo. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (photo) {
      setTitle(photo.title);
      setUrl(photo.url);
      setError("");
    }
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

  if (fetchError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{fetchError}</p>
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
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Photo</h1>
        </div>

       
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

        {/* Edit Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Edit Photo Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Photo Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter photo title"
              />
            </div>

            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Photo URL *
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter photo URL"
              />
            </div>

            {/* URL Preview */}
            {url && url !== photo.url && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preview New Image
                </label>
                <div className="border border-gray-200 rounded-md p-3">
                  <img
                    src={url}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.jpg";
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Updating..." : "Update Photo"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPhotoPage;
