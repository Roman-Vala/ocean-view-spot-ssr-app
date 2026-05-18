import admin from "firebase-admin";

if (process.env.NODE_ENV === "production") {
  admin.initializeApp();
} else {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

export { db, admin };