// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJx-fhJ8DZRv_b2KsZnuvKDfiwR6lCg5A",
  authDomain: "mepml-1ac7c.firebaseapp.com",
  projectId: "mepml-1ac7c",
  storageBucket: "mepml-1ac7c.appspot.com",
  messagingSenderId: "15756483554",
  appId: "1:15756483554:web:0419a622224710689af7bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;