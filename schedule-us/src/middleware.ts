import { NextRequest, NextResponse } from 'next/server';
import { auth } from 'firebase-admin'; // Assuming you are using Firebase Admin SDK for server-side auth check

// Initialize Firebase Admin SDK if not already initialized elsewhere
// import admin from 'firebase-admin';
// import { getApps } from 'firebase-admin/app';
// if (!getApps().length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\\n'),
//     }),
//   });
// }


export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define routes that do not require authentication
  const publicRoutes = ['/auth/signin', '/auth/signup'];

  //