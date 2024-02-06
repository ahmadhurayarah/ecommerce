import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { UserColumn } from "./components/columns";
import { UserClient } from "./components/client";

const UserPage = async () => {
  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedUsers: UserColumn[] = users.map((item) => ({
    id: item.id,
    username: item.username,
    email: item.email,
    password: item.password,
    firstName: item.firstName,
    lastName: item.lastName,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserClient data={formattedUsers} />
      </div>
    </div>
  );
};

export default UserPage;
