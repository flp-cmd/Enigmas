import admin from "firebase-admin";
import path from "path";
import { ServiceAccount } from "firebase-admin";
import { readFileSync } from "fs";

const serviceAccountPath = path.resolve(
  __dirname,
  "../serviceAccountKeys.json"
);

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    readFileSync(serviceAccountPath, "utf8")
  ) as ServiceAccount;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
export default db;
