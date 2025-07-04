import Spinner from "@/components/Spinner";
import UsersComponent from "@/components/UsersComponent";
import { auth } from "@/lib/auth";
import { getAllUsers } from "@/lib/services";
import { Suspense } from "react";

const page = async () => {
  const session = await auth();
  console.log("User:", session);

  const users = await getAllUsers();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Community
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing photographers and their photo collections
          </p>
        </div>

        <UsersComponent users={users} />
      </div>
    </div>
  );
};

export default page;
