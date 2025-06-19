import prisma from "@/src/lib/prisma";

import EditForm from "@/src/components/EditForm";

export default async function EditArticlePage({ params }) {
  
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  const numericId = parseInt(id, 10);

  const article = await prisma.article.findUnique({
    where: { id: numericId },
  });

  if (!article) {
    return <div>Article introuvable.</div>;
  }

  return (
    <div className="edit-article-page">
      <h1>Modifier l’article</h1>
      <EditForm article={article} />
    </div>
  );
}
