import express, {request} from "express";
import { UserRepository } from "../user-repository.js";
import { PORT, SECRET_JWT_KEY } from "../config.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/login", (req, res) => {
    const {user} = req.session;

    res.render("login", {
        username: user?.username
    });
});

// Endpoint para mostrar la página de registro.
// Envía el nombre de la sesión a la vista; si no hay sesión, username queda indefinido.
router.get("/register", (req, res) => {
    res.render("register", {
        username: req.session.user?.username
    })
});

router.get('/protected', (req,res) =>{
    const {user} = req.session
    if(!user) return res.status(401).send('Acces no autorizat')
    res.render ('protected', user)
});

router.post('/login', async (req,res)=>{
    try{
        const {username,password}=req.body
        console.log("llego aqui")
        const user = await UserRepository.login({username,password})
        console.log("llego aqui 1")
        const token = jwt.sign(
            {id: user._id, username: user.username},
            SECRET_JWT_KEY, 
            {
            expiresIn:'1h'
            })
            console.log("llego aqui 2")
        res
        .cookie('access_token',token,{
            httpOnly:true, //la cookie solo se puede acceder en el servidor, no podrem fer un document.cookie
            //secure:true, //la cookie solo funciona en https
            secure: process.env.NODE_ENV==='production',
            sameSite:'strict', //la cookie es pot accedir dins del domini
            maxAge:1000*60*60 //la cookie te un temps de validesa d'una hora
        })
        .send({ user,token })
    }catch (error){
        //401 = no autorització
        res.status(401).send(error.message)
    }
});

router.post('/register', async (req,res)=>{
    //aqui el body es el cuerpo de la petición
    const {username,password}=req.body
    console.log(req.body)
    try{
        const id= await UserRepository.create({username,password});
        res.send({id})
    }catch(error){
        //No es buena idea mandar el error del repositorio
        res.status(400).send(error.message)
    }
});

router.post('/logout',(req,res)=>{
    res
    .clearCookie('access_token')
    .json({message:'logout successfull'})
});

export default router