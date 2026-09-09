# Sécurité — MVP honnête

Hanniel possède ce fichier. Le MVP est une démo : on ne prétend pas être certifiés. On montre les bons réflexes.

## Déjà dans le design

- Deux rôles distincts
- Consentement explicite (scopes + durée + destinataire)
- Minimisation : la vue partenaire est un sous-ensemble
- Journal d'accès prévu au schéma
- Données de démo clairement labellisées
- `.env*` ignoré par git

## À faire avant de persister quoi que ce soit de « réel »

- [ ] Aucune query partenaire ne renvoie `transactions` sans scope
- [ ] Vérifier `expiresAt` avec un `now` passé en argument de query
- [ ] Révoquer un consentement le rend illisible immédiatement
- [ ] Pas de secret API commité
- [ ] Pas de `any` sur les payloads d'import
- [ ] Rate-limit plus tard ; pour la démo, comptes fixes

## Interdit même en hackathon

- Envoyer le passeport complet au frontend partenaire puis « cacher » en CSS
- Logger le CSV brut vers une console publique
- Réutiliser un email comme contrôle d'accès
- Dire au jury que les données sont chiffrées de bout en bout si on ne l'a pas fait
