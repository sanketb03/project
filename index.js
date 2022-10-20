const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET", "POST"], 
    credentials: true
}));

app.post('/create', (req,res) => {
    const username = req.body.usernameReg
    console.log(username)
    res.send({message:username})
})


app.listen(3001, ()=>{
    console.log("server is running on port 3001.")
});
