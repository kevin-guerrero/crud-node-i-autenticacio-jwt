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

//Creem un endpoint per obtenir tots els productes
router.get("/", (req, res) => {
    const data = readData();
    if (!req.session.user) {
        return res.status(401).send('Acces no autorizat')
    }
    res.render("products", { data })
});

/* 
Creem un endpoint per obtenir la pàgina per crear un producte.
Es posa abans de /:id perquè Express comprova les rutes en ordre i /:id
també coincidiria amb /create_product, com si fos un identificador.
*/
router.get("/create_product", (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Acces no autorizat')
    }
    res.render("create_product");
})

//Creem un endpoint per obtenir un producte per un id
router.get("/:id", (req, res) => {
    const data = readData();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const product = data.products.find((product) => product.id === id);
    res.render("edit_products", { product });
})

//Creem un endpoint del tipus post per afegir un producte
router.post("/", (req, res) => {
    const data = readData();
    const body = req.body;
    //todo lo que viene en ...body se agrega al nuevo producte
    const newProduct = {
        id: data.products.length + 1,
        ...body,
    };
    data.products.push(newProduct);
    writeData(data);
    res.redirect("/products");
});

//Creem un endpoint per modificar un producte
router.put("/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const productIndex = data.products.findIndex((product) => product.id === id);
    data.products[productIndex] = {
        ...data.products[productIndex],
        ...body,
    };
    writeData(data);
    res.redirect("/products");
});

//Creem un endpoint per eliminar un producte
router.delete("/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const productIndex = data.products.findIndex((product) => product.id === id);
    //splice esborra a partir de productIndex, el número de elements 
    // que li indiqui al segon argument, en aquest cas 1
    data.products.splice(productIndex, 1);
    writeData(data);
    res.json({ message: "Product deleted successfully" });
});

router.use(express.static("public")); //carpeta publica pel css

export default router;