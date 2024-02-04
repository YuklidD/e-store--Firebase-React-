// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Make sure to import getStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwfDzjUGstp_ltDoTQDdyAtgrG4ZaLmEA",
  authDomain: "e-store-dev-c7551.firebaseapp.com",
  projectId: "e-store-dev-c7551",
  storageBucket: "e-store-dev-c7551.appspot.com",
  messagingSenderId: "394522626547",
  appId: "1:394522626547:web:9edf825cddf45db53e6a86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize storage with the app instance

// Export the services
export { auth, db, storage };
