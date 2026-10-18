import express from "express";
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.

const router = express.Router();

//Funció per llegir la informació
const readData = () => {
    try {
        const data = fs.readFileSync("./db/db.json");
        //console.log(data);
        //console.log(JSON.parse(data));
        return JSON.parse(data)

    } catch (error) {
        console.log(error);
    }
};

//Funció per escriure informació
const writeData = (data) => {
    try {
        fs.writeFileSync("./db/db.json", JSON.stringify(data));

    } catch (error) {
        console.log(error);
    }
}

//Creem un endpoint per obtenir tots les cançons
router.get("/", (req, res) => {
    const data = readData();
    if (!req.session.user) {
        return res.status(401).send('Acces no autorizat')
    }
    res.render("songs", { data })
});

/* 
Creem un endpoint per obtenir la pàgina per crear una cançó.
Es posa abans de /:id perquè Express comprova les rutes en ordre i /:id
també coincidiria amb /create_song, com si fos un identificador.
*/
router.get("/create_song", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Acces no autorizat')
    }
    res.render("create_song");
})

//Creem un endpoint per obtenir una cançó per un id
router.get("/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const song = data.songs.find((song) => song.id === id);
    res.render("edit_songs", { song });
})

//Creem un endpoint del tipus post per afegir una cançó
router.post("/", (req, res) => {
    const data = readData();
    const body = req.body;
    //tot el que ve en ...body s'afegeix a la nova cançó
    const newSong = {
        id: data.songs.length + 1,
        ...body,
    };
    data.songs.push(newSong);
    writeData(data);
    res.redirect("/songs");
});

//Creem un endpoint per modificar una cançó
router.put("/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const songIndex = data.songs.findIndex((song) => song.id === id);
    data.songs[songIndex] = {
        ...data.songs[songIndex],
        ...body,
    };
    writeData(data);
    res.redirect("/songs");
});

//Creem un endpoint per eliminar una cançó
router.delete("/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const songIndex = data.songs.findIndex((song) => song.id === id);
    //splice esborra a partir de songIndex, el número de elements 
    // que li indiqui al segon argument, en aquest cas 1
    data.songs.splice(songIndex, 1);
    writeData(data);
    res.redirect("/songs");
});

router.use(express.static("public")); //carpeta publica pel css

export default router;