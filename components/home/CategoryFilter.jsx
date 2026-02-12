'use client';

import "@/styles/components/home/filter.scss"

import { useRouter, useSearchParams } from 'next/navigation';
import { categoryTree } from '@/lib/categories';

export default function CategoryFilter({ selectedCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function flattenCategories(tree) {
    const flat = ['Tous'];
    tree.forEach((cat) => {
      flat.push(cat.label);
      cat.children.forEach((sub) => flat.push(sub));
    });
    return flat;
  }

  const categories = flattenCategories(categoryTree);

  const handleChange = (e) => {
    const value = e.target.value;
    const isParent = categoryTree.some((cat) => cat.label === value);

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');

    if (value === 'Tous') {
      params.delete('category');
      params.delete('parent');
    } else if (isParent) {
      params.delete('category');
      params.set('parent', value);
    } else {
      params.delete('parent');
      params.set('category', value);
    }

    router.push(`/?${params.toString()}`);
  };

  const selectedValue =
    searchParams.get('parent') ||
    searchParams.get('category') ||
    'Tous';

  return (
    <form className='filter-form'>
      <div className="filter">
        <label className='filter__label' htmlFor='category'>
          <p>Catégories:</p>
        </label>

        <div className="filter__selectWrapper">
          <select
            className='filter__select'
            id='category'
            name='category'
            value={selectedValue}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className='filter__option'>
                {cat}
              </option>
            ))}
          </select>
        </div>        
      </div>


    </form>
  );
}
