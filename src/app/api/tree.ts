// import { NextResponse } from "next/server";
// import prismadb from "@/lib/prismadb";

// export async function GET(req: Request) {
//   try {
//     const treeData = await prismadb.treeNode.findMany({
//       include: {
//         children: true,
//       },
//     });

//     return NextResponse.json(treeData);
//   } catch (error) {
//     console.error("[CATEGORIES_TREE_GET]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
