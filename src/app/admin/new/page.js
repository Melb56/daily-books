import ArticleForm from "@/src/components/ArticleForm";

export default async function NewArticlePage() {

  return (
    <div className="admin-new-article">
      <h1>Créer un nouvel article</h1>
      <ArticleForm />
    </div>
  );
}
