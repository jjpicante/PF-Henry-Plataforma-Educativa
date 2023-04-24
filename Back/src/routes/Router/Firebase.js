const { Router } = require("express");
const admin = require('firebase-admin')


var serviceAccount = require("../../proyectofinal-1be5b-firebase-adminsdk-fwxdb-b015bc12db.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://proyectofinal-1be5b-default-rtdb.firebaseio.com/'
  })
  
const dbfirebase = admin.database();
  
 router.post('/new-user',(req,res)=>{
    const newuser = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    };
    dbfirebase.ref('users').push(newuser);
  res.status(503).json(newuser);
 })


const router = Router();