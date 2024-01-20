// firebase admin configuration and setup
import { initFirestore } from '@auth/firebase-adapter';
import admin from 'firebase-admin';

// define app
let app;

// check if app is already initialized ber=fore initializing
if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  });
}

// allows to modify the database with zero restrictions
const adminDb = initFirestore({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});

// allows to create authentication tokens for client
const adminAuth = admin.auth(app);

export { adminDb, adminAuth };
