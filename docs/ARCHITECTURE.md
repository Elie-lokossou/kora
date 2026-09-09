# Architecture

```text
Entrepreneur
    │  CSV / jeu démo
    ▼
Normalize  →  Transactions
    │
    ▼
Kora Engine (lib/engine)  →  Indicators + explication
    │
    ▼
Economic Passport
    │
    ▼
Consent Management  →  scopes + durée + destinataire
    │
    ▼
Partner View  →  passeport filtré + journal d'accès
```

## Deux vitesses (volontaire)

1. **Vitesse démo** — le frontend importe `lib/demo` + `lib/engine`. Aucun backend requis. C'est le plan A du jour 1 et le plan B du pitch.
2. **Vitesse produit** — Convex persiste users, businesses, transactions, passports, consents, accessLogs. Même moteur, mêmes types.

Ne réécris pas les formules dans `app/`.

## Tables Convex

Voir `convex/schema.ts`.

- `users` : entrepreneur | partner
- `businesses` : une activité (Mariam)
- `transactions` : lignes normalisées, index `by_business` et `by_business_and_date`
- `passports` : snapshot calculé, pas un score
- `consents` : scopes[], expiresAt, status
- `accessLogs` : qui a vu quoi

## Règles Convex (non négociables)

- Toute fonction publique : `args` + `returns`
- Auth / rôle vérifiés côté serveur
- `await` sur chaque promesse
- Jamais `Date.now()` dans une **query** : passer `now` depuis le client
- Jamais `.filter()` pour un lookup : index
- Scheduler : uniquement des fonctions `internal.*`

## Filtrage partenaire

```text
getPartnerView(consentId, now)
  1. charger le consentement
  2. status === "active" && expiresAt > now
  3. charger le passeport
  4. retourner UNIQUEMENT les clés listées dans scopes
  5. écrire un accessLog (mutation, pas la query)
```

La lecture et le log sont séparés : query pour l'affichage, mutation pour le journal.

## IA

L'explication déterministe est la source de vérité de la démo.

Un LLM (action Convex `"use node"`) peut reformuler. S'il échoue, on affiche le texte déterministe. On n'affiche jamais « crédit recommandé ».
