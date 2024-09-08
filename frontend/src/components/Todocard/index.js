import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const TodoCard = ({ todos, onDelete }) => {
  const { id, work, details, dates, durability, category} = todos;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div key={id}>
      <h2>{work}</h2>
      <p>{details}</p>
      <p>{dates}</p>
      <p>{durability}</p>
      <p>{category}</p>
      {/* <p>hello</p> */}
      <button onClick={handleDelete}>
        <MdDeleteForever />
      </button>
      <Link to={`/updateTodo/${id}`}>
        <button>
          <FaEdit />
        </button>
      </Link>
    </div>
  );
};

export default TodoCard;
