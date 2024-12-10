// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 
// Si planeas usar Firestore, de lo contrario omite getFirestore

// Copia aquí la configuración que te proporcionó Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD3sACw1c5KZH9orkCcKbDLYKmk4BMBWx8",
    authDomain: "app-quinchao-d8843.firebaseapp.com",
    projectId: "app-quinchao-d8843",
    storageBucket: "app-quinchao-d8843.firebasestorage.app",
    messagingSenderId: "357381378187",
    appId: "1:357381378187:web:7d3a77518d87c351d0c48e"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore (opcional, si vas a usarlo)
const db = getFirestore(app);

export { app, db };
