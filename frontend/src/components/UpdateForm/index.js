import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Make sure 'useNavigate' is imported

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [todo, setTodo] = useState({
    work: "",
    details: "",
    dates: "",
    durability: ""
  });
           
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/todos/${id}`)
        .then(res => {
          setTodo(res.data);  // Update the form with the fetched data
        })
        .catch(err => console.log(err));
    }
  }, [id]);  // Include id in the dependency array

  const updateTodo = (e) => {
    e.preventDefault();  // Prevent page reload

    axios.put(`http://localhost:3000/updateTodo/${id}`, todo)
      .then(() => {
        alert("Todo updated successfully!");
        navigate("/");  // Use 'navigate' to redirect
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h1>Update Todo</h1>
      <form onSubmit={updateTodo}>
        <input
          type="text"
          name="work"
          value={todo.work}
          onChange={(e) => setTodo({ ...todo, work: e.target.value })}
          placeholder="Work"
        />
        <input
          type="text"
          name="details"
          value={todo.details}
          onChange={(e) => setTodo({ ...todo, details: e.target.value })}
          placeholder="Details"
        />
        <input
          type="date"
          name="dates"
          value={todo.dates}
          onChange={(e) => setTodo({ ...todo, dates: e.target.value })}
        />
        <input
          type="text"
          name="durability"
          value={todo.durability}
          onChange={(e) => setTodo({ ...todo, durability: e.target.value })}
          placeholder="Durability"
        />
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdateForm;
