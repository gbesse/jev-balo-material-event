// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { assessBaloEvent } from "../src/index.mjs";
const client = createJevClient();
const résultat = await assessBaloEvent({
  "id": "exemple-1",
  "text": "Annonce synthétique convoquant une assemblée appelée à autoriser une augmentation de capital avec suppression du droit préférentiel de souscription.",
  "source": {
    "url": "https://example.test/source-publique",
    "date": "2026-10-01"
  },
  "details": {
    "territoire": "France — cas synthétique",
    "origine": "donnée synthétique"
  }
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
