import prismadb from "@/lib/prismadb";
import CategoryNode from "./components/TreeNode"; // Import your TreeNode component
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const TreeNodePage: React.FC = async () => {
  const categories = await prismadb.category.findMany({
    include: {
      children: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading title={`Tree (${categories.length})`} description="" />
            <Link href="/tree/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            </Link>
          </div>
          <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <CategoryNode data={categories} />
            </div>
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default TreeNodePage;
