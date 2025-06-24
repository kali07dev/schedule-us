import admin, { ServiceAccount } from 'firebase-admin';
import { getApps } from 'firebase-admin/app';
import serviceAccountJson from "../../firebase.json"; 
const serviceAccount = serviceAccountJson as ServiceAccount;


// Initialize Firebase Admin only if it hasn't been initialized yet
if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminAuth = admin.auth();

export { adminAuth };