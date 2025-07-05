import LoadingSpinner from "@/components/LoadingSpinner";
import Spinner from "@/components/Spinner";

// loader for while fetching user data

const Loader = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Loading users...</p>
      </div>
    </div>
  );
};

export default Loader;
