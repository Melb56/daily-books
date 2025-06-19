'use client'

import Link from 'next/link';
import DeleteButton from '@/src/components/DeleteButton';
import Image from 'next/image';
import { useEffect, useState } from 'react';


export default function AdminHome({ session }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch('/api/admin/articles');
      const data = await res.json();
      setArticles(data);
    }

    fetchArticles();
  }, []);


  return (
    <div className="admin-dashboard">
      <div className="header">
        <h1>Espace Admin</h1>
        <p>Bienvenue {session?.user?.name}</p>
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
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={400}
                  height={600}
                />
              )}
            </div>

            <div className="article-info">
              <strong>{article.title}</strong> —{' '}
              <em>{new Date(article.date).toLocaleDateString()}</em>
              <p className="category">📁 {article.category}</p>

              <div className="admin-actions">
                <Link href={`/post/${article.slug}`} className="view-link">
                  Voir
                </Link>
                <Link href={`/admin/edit/${article.id}`} className="edit-link">
                  ✏️ Éditer
                </Link>
                <DeleteButton articleId={article.id} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}