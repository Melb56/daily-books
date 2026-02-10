import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BackButton from "@/components/BackButton";
import "@/styles/components/post.scss";
import Image from "next/image";

export default async function ArticlePage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  if (!slug || typeof slug !== "string") {
    return notFound();
  }

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) return notFound();

  return (
    <article style={{ padding: "32px" }}>
      <h1>{article.title}</h1>

      <p>{new Date(article.date).toLocaleDateString("fr-FR")}</p>

      <p style={{ fontStyle: "italic", color: "#555" }}>
        Catégorie : {article.category}
      </p>

      {article.imageUrl && (
        <Image
          src={article.imageUrl}
          alt={article.title}
          style={{ maxWidth: "100%", margin: "20px 0", borderRadius: "8px" }}
          width={400}
          height={600}
        />
      )}

      <div>{article.content}</div>

      <BackButton style={{ marginBottom: "1rem" }} />
    </article>
  );
}
