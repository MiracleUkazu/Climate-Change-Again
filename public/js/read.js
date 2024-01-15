import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

await setDoc(doc(db, 'blogs', blogId), data);

const firebaseConfig = {
    apiKey: "AIzaSyDiO7no4Fr4vgXZPDyhCQewIJA1I-V5O50",
    authDomain: "blog-hive-d883c.firebaseapp.com",
    projectId: "blog-hive-d883c",
    storageBucket: "blog-hive-d883c.appspot.com",
    messagingSenderId: "3149451026",
    appId: "1:3149451026:web:92b1fc1975b2d63d2dedcb"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let blogId = decodeURI(location.pathname.split("/").pop());

const myCollection = doc(db, 'blogs');


setDoc(myCollection, newData)
.then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        location.replace("/");
    }
})
.catch((error) => {
    console.log("Error getting document:", error);
})
