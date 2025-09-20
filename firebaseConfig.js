// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCEr5rg4nMZM_0JorAm1Y9JWm4-4kpF76o",
  authDomain: "ticketsystem-56bcd.firebaseapp.com",
  projectId: "ticketsystem-56bcd",
  storageBucket: "ticketsystem-56bcd.firebasestorage.app",
  messagingSenderId: "962259990909",
  appId: "1:962259990909:web:45c2c693bf96eb3183f414"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
