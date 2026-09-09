# Playbook d'équipe — 48 heures

John, tu as trois métiers. Ne les mélange pas dans la même conversation.

1. **Product lead** : tu coupes le scope. Si ce n'est pas dans le parcours démo, c'est non.
2. **Tech lead** : tu protèges les contrats (types, schéma, scopes). Tu merges. Tu débloques.
3. **Chef d'orchestre** : tu fais un point de 10 minutes, tu redistribues, tu arrêtes le perfectionnisme.

## Cadence

| Moment | Durée | Objectif |
|---|---|---|
| Point de synchro | 10 min | Qu'est-ce qui est fini, bloqué, suivant ? Pas de design debate. |
| Revue de démo | 15 min | John clique le parcours comme un jury. Si ça casse, on corrige avant toute nouvelle feature. |
| Freeze fonctionnel | 4 h avant le pitch | Plus de features. Texte, bugs, timing du pitch seulement. |

Un seul canal de vérité : ce repo + ce playbook. Pas trois specs dans WhatsApp.

## Branches

`master` doit **toujours** pouvoir montrer la démo, même moche.

Chacun a **une** branche, créée depuis `master` (ou depuis cette PR tant qu'elle n'est pas fusionnée) :

```text
feat/ronald-ui
feat/euloge-backend
feat/hanniel-engine
feat/john-integration
```

Règles :

- Jamais de commit direct sur `master`.
- Une branche = une personne. Pas de « je push aussi sur la branche de Ronald ».
- PR petite, titre clair, parcours démo encore valide.
- Tu ne reformates pas les fichiers d'un autre pour le plaisir.
- Tu ne changes pas `lib/engine/types.ts` ni `convex/schema.ts` sans prévenir Hanniel + Euloge dans le même message.

### Comment démarrer ta branche

```bash
git checkout master
git pull origin master
git checkout -b feat/ronald-ui    # adapte le nom
git push -u origin feat/ronald-ui
```

Si `master` n'a pas encore cette base, branche-toi depuis `cursor/kora-hackathon-os-c858`.

## Contrats (pour travailler en parallèle)

Ce sont les **seules** interfaces entre vous. Respecte-les et personne n'attend personne.

| Contrat | Fichier | Qui le possède |
|---|---|---|
| Types métier | `lib/engine/types.ts` | Hanniel |
| Formules | `lib/engine/indicators.ts` | Hanniel |
| Explication | `lib/engine/explain.ts` | Hanniel |
| Schéma DB | `convex/schema.ts` | Hanniel + Euloge |
| Import / seed | `convex/seed.ts`, `convex/transactions.ts` | Euloge |
| Consentement | `convex/consents.ts` | Euloge + Hanniel (sécu) |
| Écrans | `app/*`, `components/*` | Ronald |
| Collage démo | `components/DemoProvider.tsx`, script pitch | John |

Tant que Convex n'est pas branché, le frontend lit `lib/demo/mariam.ts`. Ronald n'est **pas** bloqué.

## Definition of Done d'une tâche

- Ça marche dans le parcours démo, pas seulement dans ta tête
- Pas de `any`
- Pas de chiffre présenté comme « réel »
- Si tu touches un consentement : un champ non autorisé n'apparaît pas chez le partenaire
- Tu as poussé ta branche

## Ce que John doit faire (et ne pas faire)

**Faire**

- Tenir le parcours 3 minutes
- Trancher en 2 minutes quand l'équipe bloque
- Merger souvent
- Écrire le script de démo à voix haute et le chronométrer
- Préparer le plan B : si Convex nâche, la démo locale suffit

**Ne pas faire**

- Recoder l'UI de Ronald « pour aider »
- Ajouter un 7e écran
- Lancer une intégration MTN « vite fait »
- Laisser un débat produit durer plus de 10 minutes

## Erreurs fatales (produit + pitch)

Lis [PITCH-GUARDRAILS.md](./PITCH-GUARDRAILS.md). En une ligne :

- On n'a **pas** d'intégrations opérateurs / banques
- On n'a **pas** des milliers d'utilisateurs
- On **n'accorde pas** de prêts
- Les chiffres de Mariam sont une **démo**
- Kora n'est **pas** « une IA »

## Erreurs fatales (technique)

- Casser le parcours pour une refacto
- Utiliser `Date.now()` dans une query Convex
- Renvoyer tout le passeport au partenaire
- Mettre des secrets dans le repo
- Attendre l'auth OAuth pour commencer
- Dupliquer les formules dans le frontend et le backend (importe `lib/engine`)
- Faire un `git push --force` sur `master` ou sur la branche d'un autre
