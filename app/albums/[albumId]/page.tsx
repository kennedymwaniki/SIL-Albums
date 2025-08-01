"use client";
import { useEffect, useState } from "react";
import { getAlbumById } from "@/lib/services";
import { useParams, useRouter } from "next/navigation";

type Album = { id: number; title: string; description?: string };
type Photo = { id: number; title: string; url?: string };

export default function AlbumPage() {
  const params = useParams();
  const albumId = Array.isArray(params.albumId)
    ? params.albumId[0]
    : params.albumId;
  const router = useRouter();
  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  console.log("Album ID:", albumId);
  console.log("Album Data:", album);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const albumData = await getAlbumById(albumId);
        setAlbum(albumData);
        setPhotos(albumData.photos || []);
      } catch (err) {
        setError("Failed to load album or photos");
      } finally {
        setLoading(false);
      }
    }
    if (albumId) fetchData();
  }, [albumId]);

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setAddError("");
    try {
      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          albumId: Number(albumId),
          title: newTitle,
          url: newUrl,
        }),
      });
      if (!res.ok) throw new Error("Failed to add photo");
      setNewTitle("");
      setNewUrl("");
      setShowAdd(false);

      const albumData = await getAlbumById(albumId);
      setAlbum(albumData);
      setPhotos(albumData.photos || []);
    } catch (err) {
      setAddError("Could not add photo");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div>Loading album...</div>;
  if (error) return <div>{error}</div>;
  if (!album) return <div>Album not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{album.title}</h1>
      <p className="mb-6">{album.description}</p>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold"> Total Photos {photos.length}</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setShowAdd((v) => !v)}
        >
          {showAdd ? "Cancel" : "Add Photo"}
        </button>
      </div>
      {showAdd && (
        <form onSubmit={handleAddPhoto} className="mb-6 space-y-2">
          <input
            className="border px-2 py-1 rounded w-full"
            placeholder="Photo Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <input
            className="border px-2 py-1 rounded w-full"
            placeholder="Photo URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={adding}
          >
            {adding ? "Adding..." : "Add Photo"}
          </button>
          {addError && <div className="text-red-600">{addError}</div>}
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {photos.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <svg
              className="w-16 h-16 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-500 text-lg">
              No photos found in this album.
            </p>
          </div>
        ) : (
          photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded shadow p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold mb-1">{photo.title}</h3>
                {photo.url && (
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
              </div>
              <button
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => router.push(`/photos/${photo.id}/edit`)}
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
