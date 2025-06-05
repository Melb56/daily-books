import { prisma } from '@/lib/prisma'; 
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';


// MISE À JOUR d’un article
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401 });
  }

  const { id } = params;
  const data = await request.json();

  try {
    // Vérifier unicité du slug pour un autre article
    if (data.slug) {
      console.log('prisma.article:', prisma.article);
      const existingSlug = await prisma.article.findFirst({
        where: {
          slug: data.slug,
          NOT: { id: parseInt(id, 10) },
        },
      });
      if (existingSlug) {
        return new Response(
          JSON.stringify({ error: 'Le slug est déjà utilisé par un autre article.' }),
          { status: 400 }
        );
      }
    }

    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id, 10) },
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        slug: data.slug,
        imageUrl: data.imageUrl || null,
        imagePublicId: data.imagePublicId || null,
      },
    });

    return new Response(JSON.stringify(updatedArticle), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur mise à jour article :', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la mise à jour.' }), {
      status: 500,
    });
  }
}

// SUPPRESSION d’un article
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401 });
  }

  const { id } = params;

  try {
    await prisma.article.delete({
      where: { id: parseInt(id, 10) },
    });

    return new Response(null, { status: 204 }); // Pas de contenu
  } catch (error) {
    console.error('Erreur suppression article :', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la suppression.' }), {
      status: 500,
    });
  }
}

// AFFICHAGE article (GET)

export async function GET(request, { params }) {
  const { id } = params;
  
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id, 10) },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        slug: true,
        imageUrl: true,
        imagePublicId: true,
        date: true,
        updatedAt: true,
      },
    });

    if (!article) {
      return new Response(JSON.stringify({ error: 'Article non trouvé' }), { status: 404 });
    }

    return new Response(JSON.stringify(article), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur récupération article :', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération.' }), {
      status: 500,
    });
  }
   
}
