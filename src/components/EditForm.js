import ArticleForm from "@/src/components/ArticleForm";

export default async function EditArticlePage({ article }) {
  if (!article) {
    return <h2>Article non trouvé.</h2>;
  }

  return <ArticleForm article={article} />;
}
