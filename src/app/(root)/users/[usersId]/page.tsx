import prismadb from "@/lib/prismadb";

import { UserForm } from "./components/user-form";

const BillboardPage = async ({ params }: { params: { usersId: string } }) => {
  const billboard = await prismadb.user.findUnique({
    where: {
      id: params.usersId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
