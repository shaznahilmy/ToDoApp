const express = require("express");

//to import and configure dotenv, a module that loads environment variables from a .env file
const dotenv = require("dotenv");
const mongoose = require("mongoose"); //a JavaScript library that creates a connection between MongoDB and Node.js
const taskRouter = require("./routes/taskRouter");
const TodoTask = require("./models/TodoTask");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this to parse JSON bodies
app.use("/static", express.static("public"));

//code to actually make the connection to the database.
mongoose.connect(process.env.DB_CONNECT)
 .then(() => {
 console.log("Connected to db!");
 app.listen(3000, () => console.log("Server Up and running"));
 })
 .catch((err) => { console.error(err); });

app.set("view engine", "ejs");


app.get('/', async (req, res) => {
    try {
        const tasks = await TodoTask.find().exec();
        res.render('todo.ejs', { tasks });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.use("/", taskRouter);

// app.post('/',(req, res) => {
//     console.log(req.body);
// });
//replaced the previous with this
//commented for my changes 
// app.post('/',async (req, res) => {
//     const todoTask = new TodoTask({
//     content: req.body.content
//     });
//     try {
//     await todoTask.save();
//     res.redirect("/");
//     } catch (err) {
//     res.send(500, err);
//     res.redirect("/");
//     }
//    });
   

//app.listen(3000, () => console.log("Server Up and running"));