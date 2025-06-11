import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


// CREATION d’un article
export async function POST(req) {
  try {
    const body = await req.json();

    const { title, content, category, slug, imageUrl, imagePublicId } = body;

    // Validation basique si tu veux en plus de Zod côté client
    if (!title || !content || !category || !slug) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    const excerpt = content.substring(0, 150); 

    const article = await prisma.article.create({
      data: {
        title,
        content,
        category,
        slug,
        excerpt,
        imageUrl: imageUrl || null,
        imagePublicId: imagePublicId || null,
        date: new Date(),
      },
    });
    
    return NextResponse.json(article, { status: 201 });
  } catch (err) {
    console.error('Erreur création article :', err);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création de l’article' },
      { status: 500 }
    );
  }
}