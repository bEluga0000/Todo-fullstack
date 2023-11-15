const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const PORT = 3000;
const app = express();
let count = 1;
// const cors = require("cors");
// app.use(cors());
const fullPath = path.join(__dirname,"todos.json");
app.use(bodyParser.json());

// PUShing the new todo for the File
app.post("/todos",(req,res)=>{
    const newTodo = {
        id:Math.floor(Math.random()*100000000),
        title:req.body.title,
        description:req.body.description
    }
    fs.readFile(fullPath,"utf-8",(err,data)=>{
        if(err) throw err;
        else
        {
            const todos = JSON.parse(data)
            todos.push(newTodo);
            fs.writeFile(fullPath, JSON.stringify(todos), (err) => {
                if (err) throw err;
                else {
                    res.status(201).send(newTodo)
                }
            })
        }
    })
})

// Getting all the todos from the file
app.get("/todos",(req,res)=>{
    fs.readFile(fullPath,"utf-8",(err,data)=>{
        if (err) throw err;
        else
        {
            res.status(201).send(JSON.parse(data))
        }
    })
})
// Deleting the todo from the array 
app.delete("/todos/:id",(req,res)=>{
    fs.readFile(fullPath, "utf-8", (err, data) => {
        if (err) throw err;
        else {
            const todos = JSON.parse(data);
            const todoDelete = todos.find(todo => todo.id == req.params.id);
            console.log(todoDelete)
            if(todoDelete)
            {
                const deletedTodo = todoDelete;
                console.log(deletedTodo);
                const indexOfTodo = todos.indexOf(todoDelete);
                todos.splice(indexOfTodo,1);
                fs.writeFile(fullPath,JSON.stringify(todos),(err)=>{
                    if (err) throw err;
                    else
                    {
                        res.status(200).send(deletedTodo);
                    }
                })
            }
            else
            {
                res.status(401).send("Please enter the valid index ");
            }
        }
    })
})
app.get("/",(req,res)=>{
    // console.log()
    res.sendFile(path.join(__dirname,"index.html"));
})
app.listen(PORT,()=>{
    console.log("Running at the port 3000")
})