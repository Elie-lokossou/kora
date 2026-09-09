# Kora — Commence ici

Tu as 48 heures. Ce fichier te dit quoi faire dans les 10 prochaines minutes.

## Ce que l'on construit (et rien d'autre)

**Kora** produit un **Economic Passport** : une représentation structurée, portable et consentie de l'activité d'un petit entrepreneur.

Cas d'usage unique du hackathon :

> Mariam, commerçante à Cotonou, importe ses données d'activité.
> Kora en fait un profil économique lisible.
> Elle partage *seulement* ce qu'elle choisit avec ABC Bank, pendant 30 jours.
> La banque voit une vue partenaire limitée — elle ne décide pas d'un crédit.

Ce n'est **pas** une banque, **pas** un score de crédit, **pas** un chatbot, **pas** un dashboard.

## Les 3 documents à lire (15 min max)

1. [DECISIONS.md](./DECISIONS.md) — ce qui est **verrouillé**. Ne rouvre pas ces débats.
2. [PLAYBOOK.md](./PLAYBOOK.md) — comment on travaille, branches, erreurs fatales.
3. [BACKLOG.md](./BACKLOG.md) — **ta** liste de tâches, pas celle du voisin.
4. Si le projet te semble fade : [ESPRIT-CRITIQUE.md](./ESPRIT-CRITIQUE.md).
5. Si tu veux gagner : [JURY.md](./JURY.md) + le script dans [DEMO-SCRIPT.md](./DEMO-SCRIPT.md). Le pitch se joue sur `/consent`, pas sur 6 écrans.

Ensuite seulement : [ARCHITECTURE.md](./ARCHITECTURE.md) si tu touches au moteur, à l'API ou au schéma.

## Qui fait quoi

| Personne | Branche | Zone | Objectif démo |
|---|---|---|---|
| **Ronald** | `feat/ronald-ui` | `app/`, `components/` | 6 écrans beaux et fluides |
| **Euloge** | `feat/euloge-backend` | `convex/` (sauf `lib/engine`) | Persister import, passeport, consentement |
| **Hanniel** | `feat/hanniel-engine` | `lib/engine/`, `convex/schema.ts`, sécu | Indicateurs + explication + accès |
| **John** | `feat/john-integration` | glue, démo, pitch, merge | Parcours 3 min qui tient debout |

## Commandes

```bash
git checkout master
git pull origin master
git checkout -b feat/<ton-prenom>-<scope>   # une seule branche par personne
npm install
npm run dev
```

L'app tourne **sans Convex** grâce aux données de démo. Convex vient ensuite, il ne bloque personne.

## La règle d'or

Si ça casse le parcours

`Import → Analyse → Passeport → Consentement → Vue partenaire`

tu ne merges pas.
