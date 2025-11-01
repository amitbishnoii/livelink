import express from "express"


const app = express();
const port = 3000;

app.get("/", async (req, res) => {
    res.send("hello world")    
})

app.listen(port, () => {
    console.log('app listening on port ', port);
})