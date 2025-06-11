import Link from 'next/link';
import prisma from '@/lib/prisma'; 
import '../styles/home.scss';
import CategoryFilter from '@/components/CategoryFilter';
import { categoryTree } from '@/lib/categories';
import Image from 'next/image';


const POSTS_PER_PAGE = 3;

const allCategories = ['Tous', ...categoryTree.flatMap(cat => cat.children)];

export default  async function HomePage({ searchParams }) {
  const params = await searchParams; 

  const currentPage = parseInt(params?.page || '1', 10);
  const selectedCategory = params?.category || 'Tous';

  const where = selectedCategory === 'Tous' ? {} : { category: selectedCategory };

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { date: 'desc' },
      skip: (currentPage - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    prisma.article.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <section className="homepage">
      <div>
        <h1>Bienvenue sur Daily Books</h1>
        <h2>Pour découvrir un livre pour chaque moment.</h2>
      </div>

      <div className="filters">
        <CategoryFilter categories={allCategories} selectedCategory={selectedCategory} />
      </div>

      <h2>Articles - {selectedCategory}</h2>
      <div className="post-list">
        {articles.map((post) => (
          <div key={post.slug} className="post-card">
            <h3>
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </h3>

            <p className="date">{new Date(post.date).toLocaleDateString()}</p>

          <p style={{ fontStyle: 'italic', color: '#555' }}>Catégorie : {post.category}</p>

          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt={post.title}
              className="post-image"
              width={600} 
              height={400}
              // style={{ maxWidth: '100%', borderRadius: '8px', margin: '12px 0' }}
            />
          )}

            <p>{post.excerpt}</p>
            <Link className="read-more" href={`/post/${post.slug}`}>
              Lire l’article →
            </Link>
          </div>
        ))}
      </div>

      <nav className="pagination">
        {currentPage > 1 && (
          <Link href={`/?category=${selectedCategory}&page=${currentPage - 1}`}>
            ← Page précédente
          </Link>
        )}
        {currentPage < totalPages && (
          <Link href={`/?category=${selectedCategory}&page=${currentPage + 1}`}>
            Page suivante →
          </Link>
        )}
      </nav>
    </section>
  );
}
