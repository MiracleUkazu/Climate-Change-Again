let blogId = decodeURI(location.pathname.split('/').pop());

let docRef = db.collection('blogs').doc(blogId);

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        location.replace("/");
    }
})