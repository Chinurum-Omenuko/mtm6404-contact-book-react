// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJ81qOPVTNR5od23IZQ-YU9E2LcYOy1e8",
  authDomain: "contact-6df4b.firebaseapp.com",
  projectId: "contact-6df4b",
  storageBucket: "contact-6df4b.firebasestorage.app",
  messagingSenderId: "572381805068",
  appId: "1:572381805068:web:0a624a4a1d8aa905e64c29",
  measurementId: "G-8TSKD6519C"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export default db;
