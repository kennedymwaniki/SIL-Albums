const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            How{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PhotoAlbum
            </span>{" "}
            Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how easy it is to organize, manage, and share your precious
            memories with our intuitive photo management platform.
          </p>
        </div>

        <div className="space-y-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Sign In with Google
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get started quickly and securely by signing in with your Google
                account. No need to remember another password - we use Google's
                trusted authentication system to keep your account safe.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Secure Google OAuth authentication
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  No additional passwords to remember
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Instant access to your account
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-8 border">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Sign in with Google
                  </h3>
                  <p className="text-gray-500 text-sm">Quick & secure access</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Discover Other Users
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Browse through our community of photographers and discover
                amazing albums from other users. See what others are sharing and
                get inspired by their creativity.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  View all registered users
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Browse their public albums
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Get inspiration from their photos
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6 border">
                <h3 className="text-lg font-semibold mb-4">Community Users</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                      <div>
                        <p className="font-medium">User {i}</p>
                        <p className="text-sm text-gray-500">{i + 2} albums</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: View Albums & Photos */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Explore Albums & Photos
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Dive into beautifully organized albums and view high-quality
                photos. Each album tells a story, and every photo captures a
                moment worth remembering.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Browse organized photo albums
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  View full-resolution images
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  See photo details and descriptions
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6 border">
                <h3 className="text-lg font-semibold mb-4">Sample Album</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Summer Vacation 2024 • 12 photos
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: Create Albums */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                4
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Create Your Own Albums
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Start organizing your memories by creating custom albums. Give
                them meaningful titles and descriptions that help tell your
                story.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Create unlimited albums
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Add custom titles and descriptions
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Organize by events, dates, or themes
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6 border">
                <h3 className="text-lg font-semibold mb-4">Create New Album</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Album Title
                    </label>
                    <div className="bg-gray-100 p-2 rounded border">
                      My Vacation Photos
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <div className="bg-gray-100 p-2 rounded border text-sm">
                      Beautiful memories from our summer trip...
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Create Album
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Add & Manage Photos */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                5
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Add & Update Photos
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Upload your favorite photos to your albums and keep them
                organized. Update photo details, add descriptions, and even
                change image URLs when needed.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Upload photos to any album
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Add titles and descriptions
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Update photo details anytime
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Change image URLs if needed
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-lg p-6 border">
                <h3 className="text-lg font-semibold mb-4">Photo Management</h3>
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600">Photo Preview</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Photo Title
                      </label>
                      <div className="bg-gray-100 p-2 rounded border text-sm">
                        Sunset at the Beach
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Image URL
                      </label>
                      <div className="bg-gray-100 p-2 rounded border text-xs text-gray-500">
                        https://example.com/photo.jpg
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                      Update
                    </button>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      Add New
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-white rounded-lg shadow-lg p-8 border">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of users today and start organizing your photos
            in a beautiful, intuitive way. Create your first album and begin
            your journey!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
