"use client";

import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      {/* go back home */}
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default Error;
