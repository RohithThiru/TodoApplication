import axios from "axios";
import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

class AddForm extends Component {
  state = { title: "", details: "", date: "", category: "work" };

  changeDetails = (event) => {
    this.setState({ details: event.target.value });
  };

  changeCategory = (event) => {
    this.setState({ category: event.target.value });
  };

  changeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  changeDate = (event) => {
    this.setState({ date: event.target.value });
  };

  addTodo = async (event) => {
    event.preventDefault();

    const { title, details, date, category } = this.state;

    if (!title || !details || !date) {
      alert("Please fill out all fields.");
      return;
    }

    let durability;

    const todayDate = new Date();
    const inputDate = new Date(date); // Convert the date from input to Date object

    if (todayDate > inputDate) {
      durability = "Done";
    } else if (todayDate < inputDate) {
      durability = "In progress";
    } else {
      durability = "Today";
    }

    const todo = {
      id: uuidv4(),
      work: title,
      details: details,
      dates: date,
      durability: durability,
      category: category
    };

    try {
      const response = await axios.post('http://localhost:3000/addTodo', todo);
      console.log('Todo added:', response.data);

      alert("Todo added successfully!");

      if (this.props.navigate) {
        this.props.navigate('/'); // Use navigate to redirect
      } else {
        console.warn("Navigate prop is not available.");
      }
    } catch (error) {
      alert(`Failed to add todo. Please try again. Error: ${error.message}`);
    }
  };

  render() {
    const { title, details, date, category } = this.state;

    return (
      <>
        <form onSubmit={this.addTodo}>
          <input
            type="text"
            value={title}
            onChange={this.changeTitle}
            placeholder="Title"
            required
          />
          <textarea
            rows="5"
            cols="30"
            value={details}
            onChange={this.changeDetails}
            placeholder="Details"
            required
          ></textarea>
          <input
            type="date"
            value={date}
            onChange={this.changeDate}
            required
          />
          <select value={category} onChange={this.changeCategory}>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="home">Home</option>
            <option value="health">Health & Fitness</option>
            <option value="learning">Learning</option>
          </select>
          <button type="submit">Save</button>
        </form>
      </>
    );
  }
}

// Create a wrapper component to pass navigate as a prop
const AddFormWithNavigate = (props) => {
  const navigate = useNavigate();
  return <AddForm {...props} navigate={navigate} />;
};

export default AddFormWithNavigate;
