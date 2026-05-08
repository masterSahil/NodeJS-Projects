const express = require('express');
const path = require('path');
const PORT = 8020;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let todos = [
  {
    id: "1712210000000",
    title: "Prepare Report",
    description: "Complete weekly project report",
    priority: "High",
    status: "Pending"
  }
];

app.get("/", (req, res) => {
    const total = todos.length;
    const pending = todos.filter(t => t.status === 'Pending').length;
    const completed = todos.filter(t => t.status === 'Completed').length;
    
    res.render('dashboard', { todos, stats: { total, pending, completed } });
});

app.get("/add-task", (req, res) => {
    res.render('add-task');
});

app.post("/add", (req, res) => {
    todos.push({
        id: Date.now().toString(),
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: "Pending"
    });
    res.redirect("/");
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(t => t.id === id);
    if (todo) {
        res.render('edit-task', { todo });
    } else {
        res.redirect('/');
    }
});

app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        todos[index].title = req.body.title;
        todos[index].description = req.body.description;
        todos[index].priority = req.body.priority;
        todos[index].status = req.body.status;
    }
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.filter(t => t.id !== id);
    res.redirect('/');
});

app.post('/update-status/:id', (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        todos[index].status = req.body.status;
    }
    res.redirect('/');
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("Problem in Server");
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});