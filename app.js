require("dotenv").config()

const express = require ("express"); 
const app = express ();

//body parsing middleware
app.use(express.json());

let todos = [
    {id: 1, task: 'Learn node.js', completed: false},
    {id: 2, task: 'Build CRUD API', completed: false},
    {id: 3, task: 'Workout for  2 hours', completed: true},
    {id: 4, task: 'Drink 6 litres of water', completed: true},
    {id: 5, task: 'Submit the project plan', completed: false},
];

//Display all tasks
app.get('/todos', (req, res) => {
    res.status(200).json(todos); // Send array as JSON
});

//Create new
app.post('/todos', (req, res) => {
    const { task, completed } = req.body;
    if (!task || !completed) return res.status(400).json({ error: " Missing fields"});
    const newTodo = { id: todos.length + 1, ...req.body}; //Auto ID
    todos.push(newTodo);
    res.status(201).json(newTodo);
    //Echo back
});

//Get active tasks
app.get("/todos/active", (req, res) => {
    const completed = todos.filter((t) => !t.completed);
    res.json(completed); //Custom read 
});  

//Get a single task
app.get('/todos/:id', (req, res) => {
    const todo = todos.find( t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({message: "Todo not found"});
    res.status(201).json(todo);
});

//Patch Update - Partial
app.patch("/todos/:id", (req, res) => {
    const todo = todos.find( t => t.id === parseInt(req.params.id)); // Array.find()
    if (!todo) return res.status(404).json({message: "Todo not found"});
    Object.assign(todo, req.body);
});

//Delete Remove
app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;
    todos = todos.filter(t => t.id !== id); //Array.filter() - non-destructive
    if (todos.length === initialLength) return res.status(404).json({error: "Not Found"});
    res.status(204).send(); //Silent success
});

app.use((err, req, res, next) => {
    res.status(500).json ({ error: "Server error!"}); 
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on port ' + JSON.stringify(PORT)));