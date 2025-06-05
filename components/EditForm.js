import ArticleForm from '@/components/ArticleForm';


export async function EditArticlePage({ article }) {

  if (!article) {
    return <h2>Article non trouvé.</h2>;
  }

  return <ArticleForm article={article} />;
}
