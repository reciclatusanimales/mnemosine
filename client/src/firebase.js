import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
	apiKey: "AIzaSyBZ1Yih81nyDHGIAHV5BVkjtLioa9nn0-Q",
	authDomain: "todo-d9908.firebaseapp.com",
	projectId: "todo-d9908",
	storageBucket: "todo-d9908.appspot.com",
	messagingSenderId: "1007108661037",
	appId: "1:1007108661037:web:ae86813cf533e777347da4",
});

export { firebaseConfig as firebase };
