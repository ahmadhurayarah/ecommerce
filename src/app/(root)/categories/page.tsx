import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CategoryColumn } from "./components/columns";
import { CategoryClient } from "./components/client";

const CategoryPage = async () => {
  const categories = await prismadb.category.findMany({
    include: {
      children: true,
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    parentCategoryId: item.parentCategoryId,
    subcategories: (item.children || []).map((sub) => ({
      id: sub.id,
      name: sub.name,
    })),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoryPage;
