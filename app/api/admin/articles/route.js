import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  

  const articles = await prisma.article.findMany({
    orderBy: { date: "desc" },
  });

  return new Response(JSON.stringify(articles), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
