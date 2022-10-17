const express = require("express")
const app = express()
const cors = require("cors")
const mysql = require("mysql")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const session = require("express-session")
const cookieParser = require("cookie-parser")

const saltRounds = 10;

app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET", "POST"], 
    credentials: true
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    key: "userid",
    secret: "loginandregestration",
    resave: false, 
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}))


const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"blog"
})

app.get('/login',(req,res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})

app.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE username = ?;",username,(err, result) => {
        if(err){
            res.send({err:err})
        }
        
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (err, response) => {
                if(response){
                    req.session.user = result;
                    res.send(result)
                }else{
                    res.send({message:"Wrong username or password"})
                }
            })
        }
        else{
            res.send({message:"no user found"})
        }
        
    })
})


app.post('/create', (req,res) => {
    const username = req.body.usernameReg
    const email = req.body.emailReg
    const password = req.body.passwordReg

    db.query("SELECT * FROM users WHERE username = ?;",username,(err, result) => {
        if(err){
            res.send({err:err})
        }
        
        if(result.length > 0){
            res.send({message:"user Already exists"})            
        }else{
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err){
                    console.log(err)
                }
        
                db.query('INSERT INTO users (username,email, password) VALUES (?,?,?)',
                    [username, email, hash], 
                    (err,  result) =>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            res.send("values inserted")
                        }
                    }
                );
            })
        }
    })
    

    

})

app.get('/users', (req,res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if(err){
            console.logg(err)
        }
        else{
            res.send(result)
        }
    });
})

app.listen(3001, ()=>{
    console.log("server is running on port 3001.")
});

