import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChfxV9hqSNUZDTZgcZ1sMI5a3tLEhhsxU",
  authDomain: "mobile-world-af86f.firebaseapp.com",
  projectId: "mobile-world-af86f",
  storageBucket: "mobile-world-af86f.appspot.com",
  messagingSenderId: "992708109114",
  appId: "1:992708109114:web:d016ec5bd281d83f586603",
  measurementId: "G-5Z26LF50K0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
