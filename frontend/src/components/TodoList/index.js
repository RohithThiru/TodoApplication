import { Component } from "react";
import axios from "axios";
import Todocard from "../Todocard";
import { Link } from "react-router-dom";
class TodoList extends Component {
  state = { todoList: [] };

  fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      if (response.status === 200) {
        // console.log(response.data);  // Log the response to debug if necessary
        const formattedData = response.data.map(eachItem => ({
          id: eachItem.id,  // Ensure 'indexes' matches your database schema
          work: eachItem.work,
          details: eachItem.details,
          dates: eachItem.dates,
          durability: eachItem.durability,
          category:eachItem.category
        }));
        this.setState({ todoList: formattedData });
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      // console.error("Error fetching todo data:", error);
      alert("Error fetching todo data. Please try again later.");
    }
  };

  componentDidMount() {
    this.fetchTodos();
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:3000/deletetodo/${id}`)
    this.fetchTodos()
  }


  render() {
    const { todoList } = this.state;
    return (
      <>
        <h1>Todo List</h1>
        {todoList.map(eachTodo => (
          <Todocard key={eachTodo.id} todos={eachTodo} onDelete={this.onDelete}/>
        ))}
        <Link to="/addetails"><button>Add</button></Link>
      </>
    );
  }
}

export default TodoList;
