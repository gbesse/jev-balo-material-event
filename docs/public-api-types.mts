// Objectif : vérifier les types publiés depuis un projet consommateur.
import { baloAnnouncementCase, assessBaloEvent, DECISIONS } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = baloAnnouncementCase({
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
});
void DECISIONS;
void assessBaloEvent(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "material_event", probabilities: { "material_event": 0.82, "review_required": 0.06, "routine_event": 0.06, "no_announcement": 0.06 }, confidence: 0.82 } } })));

// Ces erreurs attendues protègent le contrat des consommateurs TypeScript.
// @ts-expect-error — un fournisseur doit retourner une réponse Jev complète.
createFakeProvider(() => ({}));
const result = await assessBaloEvent(dossier, createFakeProvider(() => ({ model: "jev-1.13.0", answers: {} })));
const review: boolean = result.review;
void review;
// @ts-expect-error — la revue humaine est un booléen.
const incorrect: string = result.review;
void incorrect;
