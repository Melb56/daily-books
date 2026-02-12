import Link from 'next/link';
import '../styles/components/PostCard.scss'
import Image from ' next/image' ;

export default function PostCard({ post }) {
  return (
    <div className=' post-card' >
      <h3>
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className=' homepage__author' >
        Par {post.author}
      </p>
      {article.imageUrl && (
        <Image 
          src={article.imageUrl} 
          alt={article.title} className=' max-w-md' 
           />
      )}
      <p className=' date' >{new Date(post.date).toLocaleDateString()}</p>
      <p>{post.excerpt}</p>
      <Link className=' read-more'  href={`/post/${post.slug}`}>
        Lire l’article →
      </Link>
    </div>
  );
}