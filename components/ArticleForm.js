'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import { categoryTree } from '@/lib/categories';
import BackButton from '@/components/BackButton';


const flatCategories = categoryTree.flatMap(cat => cat.children);

const categoryEnum = z.union(flatCategories.map(c => z.literal(c)));

const schema = z.object({
  title: z.string().min(5, 'Le titre doit faire au moins 5 caractères'),
  content: z.string().min(20, 'Le contenu doit faire au moins 20 caractères'),
  category: categoryEnum,
  slug: z.string().min(3, 'Le slug doit faire au moins 3 caractères'),
  imageUrl: z.string().url().optional(),
  imagePublicId: z.string().optional(),
});

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // enlever caractères spéciaux
    .replace(/\s+/g, '-')      // remplacer espaces par tirets
    .substring(0, 50);         // limiter la longueur
}

export default function ArticleForm({ article = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [imagePreview, setImagePreview] = useState(article?.imageUrl || '');
  const [publicId, setPublicId] = useState(article?.imagePublicId || '');

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: article?.title || '',
      content: article?.content || '',
      category: article?.category || 'Thriller',
      slug: article?.slug || '',
      imageUrl: article?.imageUrl || '',
      imagePublicId: article?.imagePublicId || '',
    },
  });

  const titleValue = watch('title');

  // Générer automatiquement le slug quand le titre change (uniquement si on est en création ou si slug vide)
  useEffect(() => {
    if (!article || !article.slug) {
      const newSlug = generateSlug(titleValue);
      setValue('slug', newSlug);
    }
  }, [titleValue, article, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const url = article ? `/api/articles/${article.id}` : '/api/articles/create';
      const method = article ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...data,
          imageUrl: imagePreview,
          imagePublicId: publicId,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erreur lors de la sauvegarde de l’article');
      }
      
  
      router.push('/admin');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="article-form">
      <div>
        <label htmlFor="title">Titre</label>
        <input id="title" {...register('title')} />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="slug">Slug (URL unique)</label>
        <input id="slug" {...register('slug')} />
        {errors.slug && <p className="error">{errors.slug.message}</p>}
      </div>

      <div>
        <label htmlFor="category">Catégorie</label>
        <select id="category" {...register('category')}>
          {categoryTree.map(group => (
            <optgroup key={group.label} label={group.label}>
              {group.children.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </optgroup>
          ))}
        </select>
        {errors.category && <p className="error">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="content">Contenu</label>
        <textarea id="content" {...register('content')} rows={8} />
        {errors.content && <p className="error">{errors.content.message}</p>}
      </div>

      <div>
        <label>Image</label>
        <ImageUploader
          onUploaded={({ url, public_id }) => {
            if (publicId) {
              fetch('/api/upload/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ public_id: publicId }),
              });
            }
            setValue('imageUrl', url);
            setImagePreview(url);
            setPublicId(public_id);
          }}
        />
        <input type="hidden" {...register('imageUrl')} />
        <input type="hidden" {...register('imagePublicId')} />
        {imagePreview && (
          <div style={{ marginTop: 10 }}>
            <img src={imagePreview} alt="Aperçu" style={{ maxWidth: 200 }} />
            <button
              type="button"
              style={{ color: 'red', marginTop: 5 }}
              onClick={async () => {
                const confirmDelete = confirm('Supprimer l’image ?');
                if (!confirmDelete) return;

                const res = await fetch('/api/upload/delete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ public_id: publicId }),
                });

                if (res.ok) {
                  setImagePreview('');
                  setPublicId('');
                  setValue('imageUrl', '');
                  setValue('imagePublicId', '');
                } else {
                  alert("Échec de la suppression de l'image");
                }
              }}
            >
              Supprimer l’image
            </button>
          </div>
        )}
      </div>

      {errorMsg && <p className="error">{errorMsg}</p>}

      <button type="submit" disabled={loading}>
        {loading ? (article ? 'Enregistrement...' : 'Création...') : (article ? 'Enregistrer' : 'Créer')}
      </button>

      <BackButton style={{ marginBottom: '1rem' }} />
    </form>
  );
}
