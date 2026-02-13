"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import { categoryTree } from "@/lib/categories";
import BackButton from "@/components/buttons/BackButton";
import Image from "next/image";
import "@/styles/components/articleform.scss"

const flatCategories = categoryTree.flatMap((cat) => cat.children);

const categoryEnum = z.union(flatCategories.map((c) => z.literal(c)));

const schema = z.object({
  title: z.string().min(5, "Le titre doit faire au moins 5 caractères"),
  content: z.string() .trim().min(20, "Le contenu doit faire au moins 20 caractères"),
  category: categoryEnum,
  slug: z.string().min(3, "Le slug doit faire au moins 3 caractères"),
  author: z.string().min(2, "Le nom de l’auteur doit faire au moins 2 caractères"),
  imageUrl: z.string().url().optional(),
  imagePublicId: z.string().optional(),
});

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") 
    .replace(/\s+/g, "-") 
    .substring(0, 50); 
}

export default function ArticleForm({ article = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [imagePreview, setImagePreview] = useState(article?.imageUrl || "");
  const [publicId, setPublicId] = useState(article?.imagePublicId || "");

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: article?.title || "",
      content: article?.content || "",
      category: article?.category || "Thriller",
      slug: article?.slug || "",
       author: article?.author || "",
      imageUrl: article?.imageUrl || "",
      imagePublicId: article?.imagePublicId || "",
    },
  });

  const titleValue = watch("title");

  useEffect(() => {
    if (!article || !article.slug) {
      const newSlug = generateSlug(titleValue);
      setValue("slug", newSlug);
    }
  }, [titleValue, article, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const url = article
        ? `/api/articles/${article.id}`
        : "/api/articles/create";
      const method = article ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          imageUrl: imagePreview,
          imagePublicId: publicId,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(
          err.error || "Erreur lors de la sauvegarde de l’article",
        );
      }

      router.push("/admin");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="article-form">
      {/* TITLE */}
      <div className="article-form__field">
        <label className="article-form__label" htmlFor="title">Titre</label>
        <input className="article-form__input" id="title" {...register("title")} />
        {errors.title && (
          <p className="article-form__error" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* SLUG */}
      <div className="article-form__field">
        <label className="article-form__label" htmlFor="slug">Slug (URL unique)</label>
        <input 
        className="article-form__input" 
        id="slug" {...register("slug")} />
        {errors.slug && (
          <p className="article-form__error" role="alert">
            {errors.slug.message}
          </p>
        )}
      </div>

    {/* AUTHOR */}
      <div className="article-form__field">
        <label className="article-form__label" htmlFor="author">
          Auteur
        </label>
        <input className="article-form__input" id="author"
          {...register("author")}
        />
        {errors.author && (
        <p className="article-form__error" role="alert">
          {errors.author.message}
        </p>
        )}
      </div>

      {/* CATEGORY */}
      <div className="article-form__field">
        <label className="article-form__label" htmlFor="category">Catégorie</label>
        <select className="article-form__select" id="category" {...register("category")}>
          {categoryTree.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.children.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {errors.category && (
          <p className="article-form__error" role="alert">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* CONTENT */}
      <div className="article-form__field">
        <label 
          className="article-form__label" htmlFor="content">
            Contenu
        </label>
        <textarea className="article-form__textarea" id="content" {...register("content")}  placeholder="Écris le résumé du livre."/>
        {errors.content && (
          <p className="article-form__error" role="alert">
            {errors.content.message}
          </p>
        )}
      </div>

      {/* IMAGE */}
      <div className="article-form__field">
        <label className="article-form__label">Image</label>

        <div className="article-form__uploader">
          <ImageUploader
            onUploaded={({ url, public_id }) => {
              if (publicId) {
                fetch("/api/upload/delete", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ public_id: publicId }),
                });
              }
              setValue("imageUrl", url);
              setValue("imagePublicId", public_id);
              setImagePreview(url);
              setPublicId(public_id);
            }}
          />
        </div>

        <input type="hidden" {...register("imageUrl")} />
        <input type="hidden" {...register("imagePublicId")} />

        {imagePreview && (
          <div className="article-form__preview">
            <Image
              className="article-form__previewImage"
              src={imagePreview}
              alt="Aperçu"
              width={400}
              height={600}
            />

            <button
              type="button"
              className="article-form__button article-form__button--danger"
              onClick={async () => {
                const confirmDelete = confirm("Supprimer l’image ?");
                if (!confirmDelete) return;

                const res = await fetch("/api/upload/delete", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ public_id: publicId }),
                });

                if (res.ok) {
                  setImagePreview("");
                  setPublicId("");
                  setValue("imageUrl", "");
                  setValue("imagePublicId", "");
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

      {errorMsg && (
        <p className="article-form__error article-form__error--global" role="alert">
          {errorMsg}
        </p>
      )}

      <div className="article-form__footer">
        <button
          type="submit"
          className="article-form__button article-form__button--primary"
          disabled={loading}
        >
          {loading
            ? article
              ? "Enregistrement..."
              : "Création..."
            : article
              ? "Enregistrer"
              : "Créer"}
        </button>

        <div className="article-form__back">
          <BackButton />
        </div>
      </div>
    </form>

  );
}
