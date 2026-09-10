# Pitch 18h — ce que tu fais maintenant

Pas de PowerPoint. Le site **est** le slide.

## Lancer (5 min)

```bash
cd kora
git fetch origin
git checkout cursor/pitch-ready-c858
git pull origin cursor/pitch-ready-c858
npm install
npm run dev
```

Plein écran Chrome : **http://localhost:3000/pitch**

Flèches du clavier = slides. Espace = suivant.

## Déroulé (4 à 5 minutes)

| Temps | Écran | Tu dis |
|---|---|---|
| 0:00 | Slide 1 Kora | « On est Kora. On ne construit pas une banque. On construit le dossier que l’entrepreneur possède. » |
| 0:40 | Slide 2 Problème | « Mariam a une activité. La preuve est éparpillée. Elle n’a rien de propre à montrer sans tout livrer. » |
| 1:20 | Slide 3 Inde | « En Inde, l’Account Aggregator fait déjà ce geste : consentement, durée, révocation. Au Bénin, le tuyau n’existe pas, et beaucoup d’activité n’est même pas numérique. » |
| 2:00 | Slide 4 Solution | « Kora, c’est ce geste adapté ici. Elle ouvre un dossier qui expire. On ne prête pas. L’IA n’accorde rien. » |
| 2:30 | Clic **Voir le geste** → `/consent` | « Elle choisit les cases. Transactions individuelles : refusées. » Décoche-les si elles sont cochées. « Autoriser. » |
| 3:15 | Clic **Vue banque** | « Voilà ce que le partenaire reçoit. Pas le cahier. Pas les tickets. » |
| 3:45 | Close | « C’est un prototype, données de démo. Le produit, c’est le contrôle. Merci. » |

Si on te coupe : reste sur le consentement. C’est le seul écran qui compte.

## Interdit

- Scroller toute la landing (trop long, ça ressemble à tous les autres).
- Dire « on est connectés à MTN / aux banques ».
- Présenter 386 000 FCFA comme du terrain.
- Improviser l’architecture.

## Si le site plante

Tu parles les 4 phrases des slides, sans écran. Puis : « La démo est sur le repo, on vous la montre juste après. »
