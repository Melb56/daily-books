import Link from "next/link";
import Image from "next/image";
import "@/styles/components/home/articlelist.scss"
import Button from "@/components/buttons/Button";

export default function ArticleList({ articles = [] }) {
  if (!articles.length) {
    return <p className="list__empty">Aucun article pour le moment.</p>;
  }

  return (
    <section className="list">
      {articles.map((post) => (
        <article key={post.slug} className="list__card">
            <div className="list__title">
                <h3>
                    <Link href={`/post/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.author}</p>
                <p className="list__category"> {post.category}</p>
            </div>
            

            {post.imageUrl && (
                <div className="list__image">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={160}
                    height={250}
                    sizes="(max-width: 768px) 100px, 120px"
                />
                </div>     
          )}

            <p className="list__excerpt">{post.excerpt}</p>

            <Button href={`/post/${post.slug}`}>
                Lire la suite
            </Button>
        </article>
      ))}
    </section>
  );
}
