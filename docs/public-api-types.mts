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
void assessBaloEvent(dossier, createFakeProvider(() => ({})));
