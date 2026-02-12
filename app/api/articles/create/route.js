import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// CREATION 
export async function POST(req) {
  try {
    const body = await req.json();

    const { title, content, category, slug, imageUrl, imagePublicId, author } = body;

    if (!title || !content || !category || !slug || !author) {
      return NextResponse.json(
        { error: 'Champs manquants' }, 
        { status: 400 });
    }

    const excerpt = content.substring(0, 150);

    const article = await prisma.article.create({
      data: {
        title,
        content,
        category,
        slug,
        author,
        excerpt,
        imageUrl: imageUrl || null,
        imagePublicId: imagePublicId || null,
        date: new Date(),
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (err) {
    console.error('Erreur création article :', err);

      if (err?.code === 'P2002') {
    return NextResponse.json(
      { error: 'Slug déjà utilisé. Choisis un slug unique.' },
      { status: 409 }
    );
  }

    return NextResponse.json(
      { error: 'Erreur serveur lors de la création de l’article' },
      { status: 500 },
    );
  }
}
