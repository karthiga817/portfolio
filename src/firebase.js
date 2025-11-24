import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBa-n7AFTju2QD7gy42ndbOX_hx7JwbQMY",
    authDomain: "portfolio-9c15f.firebaseapp.com",
    projectId: "portfolio-9c15f",
    storageBucket: "portfolio-9c15f.firebasestorage.app",
    messagingSenderId: "128416178706",
    appId: "1:128416178706:web:90d0bb493b6627d5806ecb",
    measurementId: "G-N8D3RH8DXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
