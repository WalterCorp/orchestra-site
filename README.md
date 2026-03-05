# ORCHESTRA — Site vitrine CMS-first & IA gouvernée

Site vitrine démonstrateur Diligency Vision — architecture headless CMS-first avec chatbot IA gouverné et pipeline d'automatisation des leads en production.

🔗 [Voir le site en production](https://orchestra-site.vercel.app)

---

## 🏗️ Architecture

Ce projet repose sur quatre couches indépendantes et découplées. Chaque couche peut évoluer ou être remplacée sans impacter les autres — ce découplage est le fondement de la réplicabilité du modèle Diligency.

| Couche | Technologie | Rôle |
|--------|-------------|------|
| Frontend | Next.js App Router · TypeScript · Tailwind CSS | Rendu, routing, SEO, composants UI |
| CMS | Sanity v5 | Source de vérité pour tous les contenus |
| IA | OpenAI gpt-4o-mini | Chatbot contextuel gouverné + pré-réponse contact |
| Automatisation | n8n | Réception leads → qualification → email → Google Sheets |

**Principe cardinal : UI ≠ API ≠ Logique IA ≠ CMS**

---

## ⚙️ Stack technique

- **Frontend** : Next.js 14 App Router · TypeScript · Tailwind CSS
- **CMS** : Sanity v5 — Studio : [orchestra-cms.sanity.studio](https://orchestra-cms.sanity.studio)
- **CMS repo** : [DiligencyVision/orchestra-cms](https://github.com/DiligencyVision/orchestra-cms)
- **IA** : OpenAI gpt-4o-mini (température 0.3 · max_tokens 350 · JSON strict)
- **Automatisation** : n8n — instance Diligency Vision
- **Déploiement** : Vercel (CI/CD automatique sur push `main`)

---

## ✅ Fonctionnalités

### Site CMS-first — 7 pages pilotées par Sanity
- Accueil · Cabinet · Méthode · Fonctionnement · Expertises · FAQ · Contact
- Type unique `page` — architecture réplicable client
- `globalSettings` : Header, Footer, brand, SEO global
- Hero configurable depuis Sanity (solid / image / vidéo)
- SEO dynamique via `generateMetadata()`

### Chatbot IA gouverné
- Bulle flottante — contexte de page injecté automatiquement
- Gouvernance stricte : pas de prix, pas de promesse, pas d'engagement contractuel
- Historique limité à 6 messages · fallback automatique si OpenAI indisponible
- Knowledge extract v1.1 — mis à jour manuellement (`lib/ai/knowledgeExtract.ts`)

### Pipeline Contact Pro (n8n)
- Formulaire sécurisé (honeypot + validation serveur)
- Webhook n8n → normalisation → qualification → pré-réponse IA → email → Google Sheets
- Environnement 100% entreprise (Gmail Diligency + Google Sheets Diligency)
- Workflow versionné : v2.1.1

---

## 🔐 Sécurité

- `OPENAI_API_KEY` et `CONTACT_WEBHOOK_URL` strictement côté serveur
- Aucune clé secrète committée
- Logs RGPD-safe — aucune donnée personnelle loggée
- Validation Content-Type et longueur des inputs côté API

---

## 🌍 Déploiement

Push sur `main` → déploiement automatique Vercel.

Variables d'environnement à déclarer sur Vercel (Settings → Environment Variables) :

| Variable | Visibilité | Rôle |
|----------|-----------|------|
| `CONTACT_WEBHOOK_URL` | Serveur uniquement | URL webhook n8n Contact Pro |
| `OPENAI_API_KEY` | Serveur uniquement | Clé API OpenAI |
| `OPENAI_MODEL` | Serveur uniquement | Modèle OpenAI (gpt-4o-mini) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Client + Serveur | ID projet Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Client + Serveur | Dataset Sanity (production) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Client + Serveur | Version API Sanity |

---

## 🚀 Installation locale
```bash
git clone https://github.com/DiligencyVision/orchestra-site.git
cd orchestra-site
npm install
# Créer .env.local avec les variables ci-dessus
npm run dev
```
→ http://localhost:3000

---

## 📁 Structure du projet
```
app/
  api/
    assistant/        # Endpoint chatbot IA
    contact/          # Endpoint formulaire contact
  [slug]/             # Pages dynamiques pilotées par Sanity
components/
  ai/                 # ChatWidget, ChatWidgetClient
  layout/             # Header, Footer
lib/
  ai/                 # assistant.ts, knowledgeExtract.ts
  sanity/             # client.ts, queries.ts
```

---

## 🧠 Retours d'expérience

- Toujours aligner schéma Sanity → requête GROQ → typage TypeScript → composant
- Ne jamais exposer une URL webhook ou clé API via `NEXT_PUBLIC_*`
- Utiliser `JSON.stringify()` pour les injections dynamiques dans n8n
- Prévoir un fallback pour chaque champ CMS optionnel
- Un module IA doit toujours avoir un mode dégradé

---

## 📄 Licence

Usage interne — Diligency Vision — 2026
