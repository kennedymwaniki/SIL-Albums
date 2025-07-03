import { auth } from "@/lib/auth";

const page = async () => {
  const session = await auth();
  console.log("User:", session);
  return (
    <div>
      <h1>Users</h1>
      <h1>Hello {session?.user?.name}</h1>
      <h1>Hello {session?.user?.id}</h1>
    </div>
  );
};

export default page;
