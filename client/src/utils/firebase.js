
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-c7170.firebaseapp.com",
  projectId: "interviewiq-c7170",
  storageBucket: "interviewiq-c7170.firebasestorage.app",
  messagingSenderId: "563876508831",
  appId: "1:563876508831:web:d5923a5d8e25ae9ae61eaa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/**
 * FORCE ACCOUNT SELECTION
 * =====================
 * This tells Google: "Always show the account picker, even if user is already logged in"
 * 
 * We use "select_account" instead of "login" because:
 * - select_account: Shows existing accounts + allows signing in with a different account
 * - login: Always requires fresh authentication (more strict, slower)
 */
provider.setCustomParameters({
  prompt: "select_account"
});

export { auth, provider };
