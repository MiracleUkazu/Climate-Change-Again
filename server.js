import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let initial_path = path.join(__dirname, 'public');
app.use(express.static(initial_path));

import fileUpload from 'express-fileupload';
app.use(fileUpload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

// upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.get("/:read", (req, res) => {
    res.sendFile(path.join(initial_path, "read.html"));
})

app.use((req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log('listening......');
})
