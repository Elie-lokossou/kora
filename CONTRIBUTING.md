# Contribuer à Kora

Lis d'abord [docs/START-HERE.md](./docs/START-HERE.md) et [docs/PLAYBOOK.md](./docs/PLAYBOOK.md).

## Branches

| Branche | Qui |
|---|---|
| `master` | Démo fusionnée, toujours jouable |
| `feat/ronald-ui` | Ronald |
| `feat/euloge-backend` | Euloge |
| `feat/hanniel-engine` | Hanniel |
| `feat/john-integration` | John |

```bash
git checkout master
git pull origin master
git checkout -b feat/<prenom>-<scope>
git push -u origin HEAD
```

Commits : `feat:`, `fix:`, `docs:`, `chore:` + une phrase utile.

## PR

- Titre = ce que le jury gagnerait à voir
- Décrit le risque pour le parcours démo
- John review en priorité le parcours, pas le style

## Qualité minimale

```bash
npm run lint
npm run typecheck
npm test
```

Pas de `any`. Pas de force-push sur `master`.
