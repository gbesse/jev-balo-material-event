# Jev BALO Material Event

**Transforme une annonce BALO en événement d’entreprise structuré et signale les changements potentiellement significatifs.**

[![Tests](https://github.com/gbesse/jev-balo-material-event/actions/workflows/test.yml/badge.svg)](https://github.com/gbesse/jev-balo-material-event/actions/workflows/test.yml) [MIT](LICENSE) · Node.js 22+ · v0.1.0 · Documentation française

Jev BALO Material Event transforme un dossier sourcé en une catégorie explicite et révisable. Le dépôt sépare les règles vérifiables en code de la comparaison sémantique confiée à Jev.

## Démarrage rapide

```sh
git clone https://github.com/gbesse/jev-balo-material-event.git
cd jev-balo-material-event
npm install
npm run demo
```

Les trois démonstrations utilisent uniquement des données et probabilités synthétiques. Elles n’effectuent aucun appel réseau et ne mesurent pas la qualité réelle de Jev.

## Exemple exécutable

Le scénario principal aboutit à **`evenement_significatif`**. Une assertion fait échouer la commande si le contrat change. Le code complet se trouve dans [`examples/demo.mjs`](examples/demo.mjs).

```sh
npm run demo:principal
```

### Cas limite déterministe

[`examples/cas-limite.mjs`](examples/cas-limite.mjs) exerce une règle métier avant tout appel sémantique.

```sh
npm run demo:limite
```

Résultat attendu : **`aucune_annonce_fournie`**, avec zéro appel Jev.

### Décision incertaine à revoir

[`examples/revue-humaine.mjs`](examples/revue-humaine.mjs) simule un dossier incomplet. Une confiance de `0.62` doit produire `review: true` afin que l’incertitude reste visible.

```sh
npm run demo:revue
```

Résultat attendu : **`revue_requise`**, avec `revue humaine : true`. `npm run demo` exécute les trois scénarios.

## Utilisation de la bibliothèque

Importez `assessBaloEvent` depuis `@gbesse/jev-balo-material-event`. Fournissez `createJevClient()` depuis l’export `./jev`, ou `createFakeProvider()` pour les tests hors ligne.

## Frontière de décision

Transforme une annonce BALO en événement d’entreprise structuré et signale les changements potentiellement significatifs. La sortie sert à ordonner ou préparer une revue humaine. Elle ne constitue ni une décision administrative, ni un avis juridique, médical ou financier, ni une garantie d’éligibilité ou de conformité.

Les montants, dates, identifiants et calculs de variation restent traités par le code. La question et les critères envoyés à Jev sont versionnés dans [`src/index.mjs`](src/index.mjs).

## Source publique

- [API du Bulletin des annonces légales obligatoires](https://www.data.gouv.fr/dataservices/api-bulletin-des-annonces-legales-obligatoires-balo)

Conservez l’identifiant amont, l’URL, la date de récupération, le millésime et la licence de chaque donnée. Vérifiez le schéma et les conditions de réutilisation auprès du producteur avant ingestion.

## Appels Jev réels

Les appels réels sont facultatifs et payants. Le client valide le modèle et les probabilités, refuse les redirections, limite les nouvelles tentatives aux erreurs réseau et HTTP 429/529, puis bloque une requête dépassant une estimation prudente de 24 000 jetons.

```sh
TYPESAFE_API_KEY=... node scripts/live-smoke.mjs
```

N’envoyez jamais de secret, de donnée personnelle ni de dossier sensible non expurgé. Calibrez les seuils sur un corpus français annoté avant tout usage opérationnel.

## Parcours comparatif

`npm run demo:parcours` produit un rapport JSON partageable pour **jev-balo-material-event**. Chaque scénario garde sa sortie propre et échoue si son assertion ne passe plus. Les données et probabilités sont synthétiques ; aucun appel Jev n’est effectué.

## Validation

```sh
npm run check
npm run typecheck
npm test
npm run demo
npm run demo:parcours
```

La CI exécute les vérifications principales sous Node.js 22 et 24.

Projet indépendant, sans affiliation avec TypeSafe AI, data.gouv.fr ni l’administration française. Consultez la [documentation de l’API Jev](https://docs.typesafe.ai/api) et les [limites du modèle](https://docs.typesafe.ai/model-jaggedness/jev-1.13).
