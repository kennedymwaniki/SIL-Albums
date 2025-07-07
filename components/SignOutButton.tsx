"use client";

import { signOutAction } from "@/lib/actions";
import { FaArrowRightFromBracket } from "react-icons/fa6";

function SignOutButton() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signOutAction();
      }}
    >
      <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
        <span className="flex items-center gap-2">
          Sign out
          {FaArrowRightFromBracket({}) as React.ReactElement}
        </span>
      </button>
    </form>
  );
}

export default SignOutButton;
