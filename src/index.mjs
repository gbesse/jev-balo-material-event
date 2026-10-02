// Objectif : implémenter la frontière de décision métier propre au dépôt.
import { readFile } from "node:fs/promises";
export const DECISIONS = Object.freeze({
  "material_event": "evenement_significatif",
  "review_required": "revue_requise",
  "routine_event": "evenement_courant",
  "no_announcement": "aucune_annonce_fournie"
});
const CRITERIA = Object.freeze({
  "material_event": "evenement significatif",
  "review_required": "revue requise",
  "routine_event": "evenement courant",
  "no_announcement": "aucune annonce fournie"
});
export function baloAnnouncementCase(input) {
  if (!input?.id || !input?.text || !input?.source?.url || !input?.source?.date) throw new TypeError("Le dossier exige id, text, source.url et source.date");
  const date = new Date(input.source.date);
  if (Number.isNaN(date.valueOf())) throw new TypeError("source.date doit être une date ISO valide");
  return { ...input, id: String(input.id), text: String(input.text).trim(), source: { url: String(input.source.url), date: date.toISOString() } };
}
export async function assessBaloEvent(input, provider) {
  const record = baloAnnouncementCase(input);
  if (Array.isArray(record.announcements) && record.announcements.length === 0) return { decision: "no_announcement", label: DECISIONS["no_announcement"], probability: 1, review: false, deterministic: true };
  const response = await provider.decide({
    state: record,
    questions: { decision: { type: "choice", instructions: "Analysez ce dossier à partir des seuls éléments sourcés. Évaluez la nature de l’opération, son effet possible sur le capital, la gouvernance ou les droits, et les éléments explicitement publiés. Choisissez la catégorie la plus prudente. N’inventez ni fait, ni règle applicable, ni garantie.", criteria: CRITERIA } },
  });
  const answer = response.answers.decision;
  return { decision: answer.choice, label: DECISIONS[answer.choice], probability: answer.probabilities[answer.choice], confidence: answer.confidence, review: answer.confidence < 0.8, deterministic: false, usage: response.usage };
}
export async function runCli(argv, io = console) {
  if (argv.length !== 1) throw new Error("Usage : jev-balo-material-event <dossier.json>");
  const dossier = baloAnnouncementCase(JSON.parse(await readFile(argv[0], "utf8")));
  io.log(JSON.stringify({ dossier, prochaineÉtape: "Transmettez ce dossier à assessBaloEvent avec un fournisseur Jev configuré." }, null, 2));
}
