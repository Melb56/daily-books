import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BackButton from '@/components/BackButton';
import 'styles/post.scss';

export default async function ArticlePage({ params }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) return notFound();

  return (
    <article style={{ padding: '32px' }}>
      <h1>{article.title}</h1>

      <p>{new Date(article.date).toLocaleDateString('fr-FR')}</p>

       <p style={{ fontStyle: 'italic', color: '#555' }}>Catégorie : {article.category}</p>

      {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            style={{ maxWidth: '100%', margin: '20px 0', borderRadius: '8px' }}
          />
        )}

      <div>{article.content}</div>

      <BackButton style={{ marginBottom: '1rem' }} />
    </article>
    
  );
}