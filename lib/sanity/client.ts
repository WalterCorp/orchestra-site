// lib/sanity/client.ts

// Centralized Sanity client configuration.
// This ensures a single source of truth for CMS connection.

import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!, // Pinned via env for stability
  
  // useCdn:
  // true  → Uses Sanity global CDN (faster, cached, ideal for production)
  // false → Direct API requests (no cache, immediate updates, useful during development)
  useCdn: false,
})
