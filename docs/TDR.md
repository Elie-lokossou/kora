# TDR — Kora, Economic Passport (MVP hackathon)

## 1. Objet

Construire un prototype démontrable qui transforme des données d'activité fragmentées en un profil économique structuré, contrôlé par l'entrepreneur et partageable sélectivement avec un partenaire financier.

## 2. Problème

Un petit entrepreneur béninois peut avoir des ventes quotidiennes, du Mobile Money, un compte, un stock et des fournisseurs, sans posséder un dossier unique, lisible et réutilisable. Le problème n'est pas d'abord « pas de crédit ». C'est **l'absence d'une représentation portable de l'activité**.

## 3. Utilisateurs

| Rôle | Besoin | Succès |
|---|---|---|
| Entrepreneur (Mariam) | Constituer un dossier sans tout livrer | Elle choisit les champs et la durée |
| Partenaire (ABC Bank) | Comprendre l'activité vite | Elle voit un profil clair, pas un Excel brut |
| Jury | Comprendre en 3 minutes | Parcours visible, honnête, différencié |

## 4. Périmètre MVP

Inclus : import CSV / jeu démo, normalisation, indicateurs, explication, passeport, consentement, vue partenaire, journal d'accès (basique).

Exclus : connecteurs opérateurs, décision de crédit, scoring, chatbot, multi-tenant réel, mobile natif.

## 5. Exigences fonctionnelles

1. L'entrepreneur charge des données d'activité.
2. Le moteur calcule au minimum : revenu mensuel moyen, croissance, régularité, fiabilité fournisseurs, résumé de cash-flow, anomalies simples.
3. Un passeport lisible est produit.
4. Un consentement nomme le destinataire, les scopes, la durée.
5. La vue partenaire masque tout scope non accordé.
6. Chaque écran indique qu'il s'agit d'une démonstration.

## 6. Exigences non fonctionnelles

- Une personne du jury doit pouvoir suivre sans explication technique.
- Le parcours doit fonctionner même si le LLM est indisponible.
- Aucun secret dans le dépôt.
- Séparation entrepreneur / partenaire côté données, pas seulement côté UI.

## 7. Critères d'acceptation de la démo

- Import → passeport en moins de 30 secondes d'interaction
- Consentement visible (cases + durée)
- Passage entrepreneur → partenaire sans recharger un autre site
- Un champ refusé est **absent** de la vue partenaire
- Aucune phrase du pitch ne viole [PITCH-GUARDRAILS.md](./PITCH-GUARDRAILS.md)

## 8. Livrables

- Prototype web
- Jeu de données Mariam
- TDR (ce document)
- Script de démo
- Playbook d'équipe
