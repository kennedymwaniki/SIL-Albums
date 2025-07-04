// import React from "react";

import { User } from "@/db/schema";
import Link from "next/link";

interface UsersComponentProps {
  users: User[];
}

const UsersComponent = ({ users }: UsersComponentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {users.map((user: User) => (
        <div
          key={user.id}
          className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={`${user.firstname}'s avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {user.firstname.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {user.firstname} {user.lastname}
              </h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-gray-500 text-xs">
                Joined: {new Date(user.createdAt!).toLocaleDateString()}
              </p>
              <Link
                href={`/users/${user.id}`}
                className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                View Albums
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersComponent;
