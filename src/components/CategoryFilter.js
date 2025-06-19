"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categoryTree } from "@/src/lib/categories";

export default function CategoryFilter({ selectedCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fonction pour aplatir la hiérarchie avec indentation dans le label
  function flattenCategories(tree) {
    const flat = ["Tous"]; // option "Tous"
    tree.forEach((cat) => {
      flat.push(cat.label);
      cat.children.forEach((sub) => {
        flat.push("-- " + sub);
      });
    });
    return flat;
  }

  const categories = flattenCategories(categoryTree);

  const handleChange = (e) => {
    let category = e.target.value;
    // Enlever les '-- ' de l'indentation dans la valeur réelle
    if (category.startsWith("-- ")) category = category.slice(3);

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  // Pour afficher la bonne option sélectionnée (avec indentation dans le label)
  // on rajoute '-- ' si c'est une sous-catégorie
  const selectedValue =
    categories.find((cat) => {
      if (cat === selectedCategory) return true;
      if (cat === "-- " + selectedCategory) return true;
      return false;
    }) || "Tous";

  return (
    <form>
      <label htmlFor="category">Catégorie :</label>
      <select
        id="category"
        name="category"
        value={selectedValue}
        onChange={handleChange}
      >
        {categories.map((cat) => {
          const value = cat.startsWith("-- ") ? cat.slice(3) : cat;
          return (
            <option key={cat} value={value}>
              {cat}
            </option>
          );
        })}
      </select>
    </form>
  );
}
