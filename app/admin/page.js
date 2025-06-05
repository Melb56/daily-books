import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { PrismaClient } from "@prisma/client";
import 'styles/admin.scss';
import SignOutButton from '@/components/SignOutButton';
import DeleteButton from '@/components/DeleteButton';
import Image from 'next/image';

const prisma = new PrismaClient();

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login');
  }

   const articles = await prisma.article.findMany({
    orderBy: { date: "desc" },
  });

   return (
    <div className="admin-dashboard">
      <div className="header">
        <h1>Espace Admin</h1>
         <p>Bienvenue {session.user.email}</p>
         <SignOutButton />
        <Link className="new-button" href="/admin/new">
          ➕ Nouvel article
        </Link>
      </div>

      <h2>Articles existants</h2>
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article.id} className="admin-article">

            <div className="article-thumbnail">
              {article.imageUrl && (
                <Image src={article.imageUrl} alt={article.title} style={{ width: '100px', height: 'auto', objectFit: 'cover' }} />
              )}
            </div>

            <div className="article-info">
              <strong>{article.title}</strong> — <em>{new Date(article.date).toLocaleDateString()}</em>
              <p className="category">📁 {article.category}</p>

              <div className="admin-actions">
                <Link href={`/post/${article.slug}`} className="view-link">Voir</Link>
                <Link href={`/admin/edit/${article.id}`} className="edit-link">✏️ Éditer</Link>
                <DeleteButton articleId={article.id} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}