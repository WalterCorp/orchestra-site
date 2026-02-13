# ORCHESTRA — Site vitrine & automatisation IA

ORCHESTRA est un projet démonstrateur modélisant un cabinet de conseil fictif.  
Il sert de base réplicable pour des sites vitrines professionnels intégrant une couche d’automatisation (n8n) et d’assistance IA (OpenAI), avec un flux de traitement validé en production.

---

## 🎯 Objectifs

- Construire un site vitrine moderne, structuré et maintenable
- Mettre en place un **flux applicatif complet** de collecte et traitement de leads
- Sécuriser la couche serveur (validation, erreurs, anti-spam)
- Industrialiser la gestion des leads via **n8n + Google Sheets**
- Ajouter une couche IA **gouvernée** : contrat strict, fallback, validation humaine

---

## ⚙️ Stack Technique

- **Front** : Next.js (App Router), React, TypeScript, Tailwind CSS
- **Back** : API Routes Next.js (`/api/*`)
- **Automatisation** : n8n (webhooks, logique conditionnelle, mapping)
- **IA** : OpenAI API (réponse structurée + contrat JSON strict)
- **Stockage** : Google Sheets (suivi des leads)
- **CI/CD** : GitHub + Vercel (production)

---

## ✅ Fonctionnalités opérationnelles

### 1) Formulaire “Contact Pro”
- Saisie : nom, email, organisation, message
- UX : états (loading/success/error), focus sur champs en erreur
- Anti-spam : **honeypot** (champ invisible)
- Payload normalisé envoyé au webhook n8n (production)

### 2) Automatisation n8n (production)
- Réception via **Webhook n8n**
- Routage conditionnel :
  - chemin “complet” si email/message OK
  - chemin “incomplet” si informations manquantes
- Préparation / enrichissement des champs (Edit Fields)
- Appel HTTP vers l’API interne d’analyse (`/api/contact-reply`)
- Merge des données Lead + IA
- Envoi email “Nouveau lead ORCHESTRA”
- Append dans Google Sheets (tracking)

### 3) Module IA (assisté et gouverné)
- Génération structurée :
  - `summary` (résumé du besoin)
  - `intent` (catégorie / intention)
  - `draft` (brouillon de réponse email)
  - `next_steps[]` (actions recommandées)
  - `disclaimer` (validation humaine obligatoire)
- Contrat **JSON strict** imposé au modèle
- Fallback automatique (mock) en cas d’indisponibilité/quota

---

## 🔐 Sécurité & Robustesse

### Séparation des responsabilités
- **API HTTP** : validation, erreurs, orchestration du flux
- **Logique IA** : isolée dans `lib/ai` (testable et remplaçable)

### Gestion des erreurs
- Gestion explicite des erreurs externes (quota, timeouts, indisponibilité)
- Mode dégradé automatique (fallback) pour préserver le flux
- Messages utilisateurs clairs côté front (UX)

### Variables d’environnement
- Secrets uniquement côté serveur (ex: `OPENAI_API_KEY`)
- Variables publiques strictement nécessaires (ex: `NEXT_PUBLIC_*`)
- Aucune clé secrète committée (audit via `git grep`)

---

## 🌍 Déploiement (Vercel)

- Déploiement **automatique** à chaque push sur `main`
- Branche `main` = production
- Configuration via variables d’environnement Vercel
- Bonnes pratiques :
  - éviter le “redeploy manuel” sauf incident
  - préférer “push → build → deploy” (traçabilité)

**Note importante (retour d’expérience)**  
Sur Vercel Hobby + repo privé en organisation, les déploiements automatiques peuvent être bloqués.  
Passage du repo en public (ou upgrade Pro) peut être nécessaire pour réactiver l’automatisation Git → Vercel.

---

## 📊 Flux Applicatif (end-to-end)

1. Utilisateur soumet le formulaire (front)
2. Le front POST vers le webhook **n8n (production)**
3. n8n valide / route (complet vs incomplet)
4. n8n appelle `/api/contact-reply` pour obtenir l’analyse IA structurée
5. n8n merge Lead + IA
6. n8n :
   - envoie un email notification
   - append une ligne dans Google Sheets

✅ Flux validé en conditions réelles.

---

## 🧱 Architecture (simplifiée)

```
app/
  api/
    contact-reply/
components/
  contact/
    ContactForm.tsx
lib/
  ai/
    contactReply.ts
public/
```

---

## ⚙️ Configuration

### Variables d’environnement

**Côté Vercel (Project Settings → Environment Variables)** :
- `OPENAI_API_KEY` (server-only)
- `OPENAI_MODEL` (optionnel)
- `NEXT_PUBLIC_N8N_WEBHOOK_URL` (public)

⚠️ `NEXT_PUBLIC_N8N_WEBHOOK_URL` doit pointer vers le webhook **production** n8n.

### Lancer en local

```bash
npm install
npm run dev
```

→ http://localhost:3000

### Build / Run prod local

```bash
npm run build
npm run start
```

---

## 🧪 Tests & validation

- Tests via navigateur (formulaire)
- Tests via `curl` sur webhook n8n
- Vérification des exécutions n8n (payload, branches, mapping)
- Validation email (contenu + champs)
- Validation Google Sheets (colonnes lead + colonnes IA)
- Debug multi-systèmes : Vercel / GitHub / n8n / Sheets

---

## 🧠 Retours d’expérience clés

- Un module IA doit prévoir un **mode dégradé** (API externe = instable)
- Séparer **couche HTTP** et **logique IA** simplifie debugging et maintenance
- Attention aux erreurs “silencieuses” de mapping (n8n → sheets)
- Éviter d’écrire des valeurs qui commencent par `=` dans Google Sheets (risque d’interprétation formule)

---

## 👤 Auteur

Walter Jean Charles
