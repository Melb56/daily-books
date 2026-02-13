# Daily Books

## Description


Daily Books est une application web fullstack permettant de gérer, organiser et explorer une bibliothèque de livres.
Le projet met l’accent sur une architecture moderne avec Next.js App Router, une authentification sécurisée et un espace admin complet pour la gestion des contenus.
Objectifs du projet :
    - Concevoir une application performante et maintenable
    - Mettre en pratique une architecture Next.js moderne
    - Développer une expérience utilisateur fluide autour de la gestion de livres


## Aperçu




## Stack technique

### Front-end
- Next.js 15 (App Router)
- React 19
- SCSS
- React Hook Form + Zod 
- React Hot Toast

### Authentification & Sécurité
- NextAuth.js v5
- Auth Prisma Adapter
- JWT
- Bcrypt / Bcryptjs

### Back-end & Base de données
- Prisma ORM
- MySQL (via Prisma)
- API Routes Next.js

### Services externes
- Cloudinary / Ne
- Nodemailer — envoi d’emails

### Qualité & Outils
- ESLint
- Prisma Migrate & Seed
- Turbopack


## Architecture technique

L’application repose sur une architecture fullstack basée sur Next.js App Router, combinant rendu serveur et composants client pour optimiser performance et maintenabilité.

    - Server Components pour le rendu initial et la récupération des données
    - Client Components pour les interactions utilisateur
    - Authentification sécurisée via NextAuth et protection de l'espace admin
    - Prisma pour la gestion des modèles et migrations
    - Validation stricte des données côté serveur
    - Upload d’images et optimisation d’images avec Cloudinary
    - Espace admin avec CRUD complet des articles


## Fonctionnalités clés

### Authentification sécurisée
- Inscription et connexion via email ou compte Google
- Sessions persistantes
- Accès sécurisé à l’espace admin

### Espace Admin
- CRUD complet des articles
- Interface dédiée à la gestion des contenus
- Upload d’images

### Gestion des formulaires
- React Hook Form pour des formulaires performants
- Validation avec Zod
- Feedback utilisateur via notifications

### Performance & UX
- Architecture Server / Client Components
- Interface responsive mobile-first
- Navigation fluide


## Choix techniques & décisions d’architecture

- Utilisation de Next.js App Router pour bénéficier du rendu hybride et améliorer les performances SEO.
- Prisma comme ORM pour garantir une couche data typée et maintenable.
- Séparation claire entre logique serveur et logique client afin de limiter le JavaScript côté navigateur.
- Validation des données à plusieurs niveaux (client + serveur) pour sécuriser les opérations critiques.
- Cloudinary pour externaliser la gestion des médias et optimiser la livraison des images.


## Évolutions en cours de développement

### Gestion des livres
- Statut Lu / À lire avec listes dédiées (PAL & Livres lus)
- Multi-catégories par article
- Ajout de nouvelles catégories

### Authentification & Comptes
- Création de comptes utilisateurs
- Connexion via email
- Renforcement des contraintes de validation

### Interface Admin
- Refonte UI des formulaires
- Filtres et tri des articles
- Amélioration du header


## Bugs identifiés au 13/02/2026
- Navbar mobile ne se ferme pas automatiquement après clic
- Résumé d’article incomplet
- Suppression d’article sans mise à jour visuelle instantanée


## Installation
- git clone https://github.com/Melb56/daily-books.git
- cd daily-books
- npm install
- npm run dev
