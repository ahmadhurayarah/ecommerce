import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { Category } from "@prisma/client"; // Import your Prisma-generated types

export async function GET(): Promise<NextResponse> {
  try {
    const categories: Category[] = await prismadb.category.findMany({
      include: {
        subcategories: {
          include: {
            subcategories: {},
          },
        },
      },
    });

    // Return a JSON response with the categories in a tree structure
    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORIES_TREE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
