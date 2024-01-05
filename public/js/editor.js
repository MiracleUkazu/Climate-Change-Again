import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');

//banner

const bannerImage = document.querySelector("#banner-upload");
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
})

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
            .then(data => {
                if (uploadType == "image") {
                    addImage(data, file.name);
                } else {
                    bannerPath = `${location.origin}/${data}`;
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                }
            })
    } else {
        alert("upload Image only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
}


let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
publishBtn.addEventListener('click', () => {
    if (articleField.value.length && blogTitleField.value.length) {
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split("-").join("-");
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }
        //setting up docName
        let docName = `${blogTitle}-${id}`;
        let date = new Date(); // for publish at info

        // acess firestore with db variable;


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



        const myCollection = collection(db, 'blogs');


        const newData = {
            title: blogTitleField.value,
            article: articleField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
            // Add other fields as needed
        };


        addDoc(myCollection, newData)
            .then((docRef) => {
                location.href = `../blog/${docRef.id}`;
            })
            .catch((error) => {
                console.error('Error adding document:', error);
            });

    }
})
