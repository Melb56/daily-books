import ArticleForm from "@/components/ArticleForm";

export default async function NewArticlePage() {
  return (
    <div className="admin-new-article">
      <h2>Nouveau livre</h2>
      <ArticleForm />
    </div>
  );
}
