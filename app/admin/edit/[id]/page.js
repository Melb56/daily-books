import prisma from '@/lib/prisma'; 
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import { redirect } from 'next/navigation';
import EditForm from '@/components/EditForm';



export default async function EditArticlePage({ params }) {
  // const session = await getServerSession(authOptions);
  const resolvedParams = await params; 
  const { id } = resolvedParams; 
  // if (!session || session.user.role !== 'ADMIN') {
  //   redirect('/login');
  // }
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