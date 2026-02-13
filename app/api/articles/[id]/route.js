import prisma from "@/lib/prisma";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function toIntId(raw) {
  const id = Number(raw);
  return Number.isInteger(id) ? id : null;
}

// MISE A JOUR
export async function PUT(request, { params }) {
  const { id: idParam } = await params;
  const id = toIntId(idParam);
 
  if (!id) return json({ error: "ID invalide" }, 400);

  const data = await request.json();

  try {
    if (data.slug) {
      const existingSlug = await prisma.article.findFirst({
        where: { slug: data.slug, NOT: { id } },
        select: { id: true },
      });

      if (existingSlug) {
        return json(
          { error: "Le slug est déjà utilisé par un autre article." },
          400
        );
      }
    }

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        slug: data.slug,
        imageUrl: data.imageUrl || null,
        imagePublicId: data.imagePublicId || null,
        author: data.author || null
      },
    });

    return json(updatedArticle, 200);
  } catch (error) {
    if (error?.code === "P2025") return json({ error: "Article non trouvé" }, 404);
    console.error("Erreur mise à jour article :", error);
    return json({ error: "Erreur lors de la mise à jour." }, 500);
  }
}

// SUPPRIMER
export async function DELETE(_request, { params }) {
  const { id: idParam } = await params;
  const id = toIntId(idParam);

  if (!id) return json({ error: "ID invalide" }, 400);

  try {
    await prisma.article.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error?.code === "P2025") return json({ error: "Article non trouvé" }, 404);
    console.error("Erreur suppression article :", error);
    return json({ error: "Erreur lors de la suppression." }, 500);
  }
}

// VOIR
export async function GET(_request, { params }) {
  const { id: idParam } = await params;
  const id = toIntId(idParam);
 
  if (!id) return json({ error: "ID invalide" }, 400);

  try {
    const article = await prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        slug: true,
        imageUrl: true,
        imagePublicId: true,
        author: true,
        date: true,
        updatedAt: true,
      },
    });

    if (!article) return json({ error: "Article non trouvé" }, 404);
    return json(article, 200);
  } catch (error) {
    console.error("Erreur récupération article :", error);
    return json({ error: "Erreur lors de la récupération." }, 500);
  }
}
