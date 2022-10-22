import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";

dotenv.config();

initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK_CREDENTIAL as string))
});
  
export const db = getFirestore();