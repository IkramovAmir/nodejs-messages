import express from "express";
import { configFile } from "./config.js";
import { fsReadFile, fsWriteFile } from "./utils/mutation.js";
import path from "path";
import fs from "fs/promises";

const app = express();
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", async (req, res) => {
    let file = path.join(process.cwd(), "src", "views", "login.html");
    return res.sendFile(file);
});

app.post("/api/login", async (req, res) => {
    try{
        let {email, password} = req.body;
        let users = await fsReadFile("users");
        let found = users.some(user => user.email == email && user.password == password)
        if (found) {
            res.json({success: true});
        } else {
            res.json({message: "User is not found!", success: false});
        };
    }catch(error) {
        res.json({message: error});
    };
});

app.post("/api/register", async (req, res) => {
    try{
        let {username, email, password} = req.body;
        let users = await fsReadFile("users");
        if (users.length) {
            let found = users.some(user => user.email == email)
            if (!found) {
                users.push({username, email, password});
                await fsWriteFile("users", users)
                return res.json({success: true});
            } else {
                return res.json({message: "This email already exists!", success: false});
            };
        }
        users.push({username, email, password});
        await fsWriteFile("users", users);
        return res.json({success: true});
    }catch (err) {
        res.json({message: err, success: false});
    };
});

app.get("/index.html", async (req, res) => {
    res.sendFile(path.join(process.cwd(), "src", "views", "index.html"));
});

app.get("/register.html",async (req, res) => {
    let file = path.join(process.cwd(), "src", "views", "register.html");
    res.sendFile(file);
});

app.post("/api/messages", async (req, res) => {
    let data = req.body;
    let messages = await fsReadFile("messages");
    data.id = messages.length ? messages.at(-1).id + 1 : 1;
    messages.push(data);
    await fsWriteFile("messages", messages);
    res.json({message: true});
});

app.get("/api/messages", async (req, res) => {
    let messages = await fsReadFile("messages");
    res.json(messages);
});


let PORT = configFile.PORT;
app.listen(PORT, console.log(`Serve is running on ${PORT}-port`));