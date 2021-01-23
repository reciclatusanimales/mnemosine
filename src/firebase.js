import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
	apiKey: "AIzaSyCL9MYbEXLDnkZK9RjThH16--rXomHZNrk",
	authDomain: "todo-reciclatusanimales.firebaseapp.com",
	databaseURL:
		"https://todo-reciclatusanimales-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "todo-reciclatusanimales",
	storageBucket: "todo-reciclatusanimales.appspot.com",
	messagingSenderId: "231411377850",
	appId: "1:231411377850:web:2d5915a7728bead4b48483",
});

export { firebaseConfig as firebase };
