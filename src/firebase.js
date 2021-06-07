import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
	// apiKey: "AIzaSyCL9MYbEXLDnkZK9RjThH16--rXomHZNrk",
	// authDomain: "todo-reciclatusanimales.firebaseapp.com",
	// databaseURL:
	// 	"https://todo-reciclatusanimales-default-rtdb.europe-west1.firebasedatabase.app",
	// projectId: "todo-reciclatusanimales",
	// storageBucket: "todo-reciclatusanimales.appspot.com",
	// messagingSenderId: "231411377850",
	// appId: "1:231411377850:web:2d5915a7728bead4b48483",
	apiKey: "AIzaSyBZ1Yih81nyDHGIAHV5BVkjtLioa9nn0-Q",
	authDomain: "todo-d9908.firebaseapp.com",
	projectId: "todo-d9908",
	storageBucket: "todo-d9908.appspot.com",
	messagingSenderId: "1007108661037",
	appId: "1:1007108661037:web:ae86813cf533e777347da4",
});

const db = firebaseConfig.firestore();
export { db };
