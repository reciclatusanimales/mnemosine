import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
	apiKey: "AIzaSyAFNl_harA2vX_y4jhJxO6J1c_HX_Gz17s",
	authDomain: "mnemosine-app.firebaseapp.com",
	projectId: "mnemosine-app",
	storageBucket: "mnemosine-app.appspot.com",
	messagingSenderId: "961166572443",
	appId: "1:961166572443:web:9aab38d61129aad2c2ff3e",
});

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default app;
