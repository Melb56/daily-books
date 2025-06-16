// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import { redirect } from 'next/navigation';
import ArticleForm from '@/components/ArticleForm';

export default async function NewArticlePage() {
  // const session = await getServerSession(authOptions);

  // if (!session || session.user.role !== 'ADMIN') {
  //   redirect('/login');
  // }

  return (
    <div className="admin-new-article">
      <h1>Créer un nouvel article</h1>
      <ArticleForm/>
    </div>
  );
}