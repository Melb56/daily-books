import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BackButton from "@/components/buttons/BackButton";
import "@/styles/components/article.scss";
import Image from "next/image";
import ScrollTopButton from "@/components/buttons/ScrollTopButton";

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
    <div className="article">
      <div className="article__title">
        <h2>{article.title}</h2>
        <p>{article.author}</p>     
        <div className="article__category">
          <p>{article.category}</p>
        </div>   
      </div>

      {/* <p>{new Date(article.date).toLocaleDateString("fr-FR")}</p> */}

    <div className="article__image">
      {article.imageUrl && (
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={160}
          height={250}
        />
      )}
    </div>

      <div className="article__content">
        <h3>Résumé</h3>
        <p>{article.content}</p>
      </div>

      <BackButton/>
      
    </div>
  );
}
