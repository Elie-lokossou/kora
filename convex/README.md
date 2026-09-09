# Convex — zone Euloge

L'UI marche **sans** Convex (données `lib/demo`). Branche Convex seulement après `npx convex dev`.

```bash
# Développement uniquement — jamais deploy pendant le hackathon
npx convex dev
```

## Ordre

1. `schema.ts` est déjà posé. Ne le casse pas sans Hanniel.
2. Écris `seed.ts` (internal) pour Mariam + ABC Bank.
3. `transactions.ts` : import + list par `businessId`.
4. `passports.ts` : appelle `lib/engine`, ne réinvente pas les formules.
5. `consents.ts` + query partenaire filtrée. Passe `now` en argument. Jamais `Date.now()` dans une query.
6. `accessLogs` via une mutation, pas dans la query de lecture.

## Auth

Tant que l'auth réelle n'est pas branchée, garde les fonctions de démo en `internal*` et un seed. Ne construis pas WorkOS si ça mange la journée.
