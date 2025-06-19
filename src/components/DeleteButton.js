'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function DeleteButton({ articleId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Voulez-vous vraiment supprimer cet article ?");

    if (!confirmed) return;

    const res = await fetch(`/api/articles/${articleId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success('Article supprimé avec succès');
      router.push('/admin'); 
    } else {
      toast.error('Échec de la suppression');
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      🗑️ Supprimer
    </button>
  );
}