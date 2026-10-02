// Objectif : montrer une décision sémantique avec des données entièrement synthétiques.
import assert from "node:assert/strict";
import { assessBaloEvent } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = {
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
};
const provider = createFakeProvider(() => ({
  "model": "jev-1.13.0",
  "answers": {
    "decision": {
      "type": "choice",
      "choice": "material_event",
      "probabilities": {
        "material_event": 0.82,
        "review_required": 0.06,
        "routine_event": 0.06,
        "no_announcement": 0.06
      },
      "confidence": 0.82
    }
  },
  "usage": {
    "input_tokens": 120,
    "output_tokens": 0
  }
}));
const résultat = await assessBaloEvent(dossier, provider);
assert.equal(résultat.decision, "material_event");
assert.equal(résultat.review, false);
assert.equal(provider.calls, 1);
console.log(`Décision : ${résultat.label} · probabilité : ${résultat.probability}`);
