import express, { request } from "express";
import methodOverride from "method-override";
import {PORT, SECRET_JWT_KEY} from "./config.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import authProducts from './routes/products.js'
import authRoutes from './routes/auth.js'

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.static("public")); // Carrega CSS i altres fitxers públics
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs'); // Motor de plantilles
app.set('views', './views'); // Ubicació de les plantilles

// Inicio middleware
app.use((req, res, next) =>{
    const token = req.cookies.access_token
    req.session={user: null}
    try{
        const data = jwt.verify(token,SECRET_JWT_KEY)
        req.session.user=data
    }catch{
        req.session.user=null
    }
    next()
})

app.use('/products', authProducts);
app.use('/auth', authRoutes);

app.get('/',(req,res) => {
    //const {user} = req.session
    res.render("index")
})

app.listen(PORT,()=>{
    console.log(`server runnig on ${PORT}`)
})