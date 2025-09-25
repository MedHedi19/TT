// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential , signOut  } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBbhWNAXiPTr0AP86chFSfWT35gzC5IpRM",
  authDomain: "projghayth.firebaseapp.com",
  projectId: "projghayth",
  storageBucket: "projghayth.firebasestorage.app",
  messagingSenderId: "938591255099",
  appId: "1:938591255099:web:a37e26ddef71866dd53a1e",
  measurementId: "G-YBEHY94R7B"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function registerUser(fullName: string, phone: string, password: string): Promise<UserCredential> {
  const fakeEmail = `${phone}@mytt.com`;
  const userCredential = await createUserWithEmailAndPassword(auth, fakeEmail, password);

  await setDoc(doc(db, 'users', userCredential.user.uid), {
    fullName,
    phone
  });

  return userCredential;
}

export async function loginUser(phone: string, password: string): Promise<UserCredential> {
  const fakeEmail = `${phone}@mytt.com`;
  return signInWithEmailAndPassword(auth, fakeEmail, password);
}
