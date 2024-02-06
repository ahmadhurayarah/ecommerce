import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, parentCategoryId } = body;

    if (!name) {
      return new NextResponse("Category name is required", { status: 400 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        parentCategoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const categories = await prismadb.category.findMany({
      include: {
        subcategories: true,
      },
    });

    const formattedCategories = categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        subcategories: category.subcategories || [], // Ensure subcategories exist and are an array
      };
    });

    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
