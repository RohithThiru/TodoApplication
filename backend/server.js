const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const cors = require('cors')
const app = express();
app.use(cors())

const dbPath = path.join(__dirname, "TodoApplication.db");

let db = null;

// Initialize Database and Server
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get('/todos', async (req, res) => {
  try {
    const getTodosQuery = `
      SELECT *
      FROM todolist;
    `;
    const todoList = await db.all(getTodosQuery);
    res.json(todoList);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch todos" });
  }
});

app.use(express.json());

app.post("/addTodo", async (req, res) => {
    const { id, work, details, dates, durability, category } = req.body;
  
    try {
      const addTodoQuery = `
        INSERT INTO todolist (id, work, details, dates, durability, category)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      
      await db.run(addTodoQuery, [id, work, details, dates, durability, category]);
      
      res.send("Success");
    } catch (error) {
      console.error("Error adding todo:", error); // Log the error for debugging
      res.status(500).send({ error: "Failed to add" });
    }
  });

  app.get("/todos/:id", async (req, res) => {
    const {id} = req.params;
    try{
      const getTodoQuery = `SELECT * FROM todoList WHERE id = ?`;
      const todo = await db.get(getTodoQuery, [id])
      res.json(todo)
    }
    catch (error){
      console.log(`${error}`)
      res.status(500)
    }
  })

  app.delete("/deletetodo/:id", async (req, res) => {
    const { id } = req.params; // Correct extraction of id
    try {
      const deleteQuery = `DELETE FROM todoList WHERE id = ?`;
      await db.run(deleteQuery, [id]); // Pass the 'id' as an array
      res.status(204).send(); // No content response
      res.send
    } catch (error) {
      console.error("Error has occurred:", error); // Log the actual error for debugging
      res.status(500).send("Error occurred"); // Send appropriate error response
    }
  });

  app.put("/updateTodo/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { work, details, dates, durability } = req.body;
      const updateQuery = `
        UPDATE todoList
        SET work = ?, details = ?, dates = ?, durability = ?
        WHERE id = ?;
      `;
      
      await db.run(updateQuery, [work, details, dates, durability, id]);
  
      res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
      console.log(`Error occurred: ${error}`);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  

  // app.get("/summa/:id", async (req, res) => {
  //   const {id} =  req.params;
  //   console.log(id);
  //   res.send(id)
  // })
  
  
  
  
