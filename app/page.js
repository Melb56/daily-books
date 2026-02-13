import prisma from "@/lib/prisma";
import "@/styles/home.scss";
import CategoryFilter from "@/components/home/CategoryFilter";
import { categoryTree } from "@/lib/categories";
import "@/components/home/ArticleList"
import Image from "next/image";
import ArticleList from "@/components/home/ArticleList";
import Pagination from "@/components/home/Pagination";

const POSTS_PER_PAGE = 4;

const allCategories = ["Tous", ...categoryTree.flatMap((cat) => cat.children)];

export default async function HomePage({ searchParams }) {
  const params = await searchParams;

  const currentPage = parseInt(params?.page || "1", 10);
  const selectedCategory = params?.category || "Tous";

  const where =
    selectedCategory === "Tous" ? {} : { category: selectedCategory };

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { date: "desc" },
      skip: (currentPage - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    prisma.article.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <section className="homepage">

      <div className="homepage__header">
        <h1 className="homepage__title">Bienvenue sur Daily Books</h1>
        <Image 
          className="homepage__image"
          src="/image/Logo/logo-image.png"
          alt="Logo"
          width={220}
          height={230}
          />
        <h2 className="homepage__subtitle">
          Parce que chaque moment mérite son livre.
        </h2>
      </div>

      <div className="homepage__filters">
        <CategoryFilter
          categories={allCategories}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* <h2 className="homepage__section-title">
        {selectedCategory}
      </h2> */}
      <div className="homepage__list">
        <ArticleList articles={articles} />
      </div>

      <div className="homepage__pagination">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          selectedCategory={selectedCategory}
          delta={2}
        />
      </div>

      

    </section>

  );
}
