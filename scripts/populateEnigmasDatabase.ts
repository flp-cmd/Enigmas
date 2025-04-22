import db from "../lib/firebaseAdmin";
import { readFileSync } from "fs";
import path from "path";

const enigmas = JSON.parse(
  readFileSync(path.join(__dirname, "../files/enigmas.json"), "utf-8")
);

async function popularEnigmas() {
  const batch = db.batch();
  enigmas.forEach((enigma: any) => {
    const ref = db.collection("enigmas").doc(enigma.id);
    batch.set(ref, enigma);
  });

  await batch.commit();
  console.log("✅ Enigmas inseridos com sucesso!");
}

popularEnigmas().catch(console.error);
