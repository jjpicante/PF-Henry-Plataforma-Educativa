import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXF_CBgwstFxgBrvc9e21VfRywY6riHSM",
  authDomain: "proyectofinal-1be5b.firebaseapp.com",
  projectId: "proyectofinal-1be5b",
  storageBucket: "proyectofinal-1be5b.appspot.com",
  messagingSenderId: "1045733294568",
  appId: "1:1045733294568:web:823e37b6e94101022b245d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();
const db = getFirestore(app);

module.export = {
  ...auth,
  ...googleprovider,
  ...db,
}