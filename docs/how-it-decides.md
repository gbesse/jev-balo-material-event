# Comment la décision est prise

Transforme une annonce BALO en événement d’entreprise structuré et signale les changements potentiellement significatifs.

Le code normalise la source et applique d’abord le cas déterministe documenté dans `src/index.mjs`. Pour les autres dossiers, Jev choisit la catégorie la plus prudente selon la nature de l’opération, son effet possible sur le capital, la gouvernance ou les droits, et les éléments explicitement publiés. Une confiance inférieure à `0.8` marque le résultat pour revue humaine.

Les montants, dates, identifiants et calculs de variation restent traités par le code.

Les démonstrations ne contiennent que des probabilités synthétiques. Constituez un corpus français annoté, mesurez les erreurs par catégorie et fixez vos propres seuils avant un usage opérationnel.
