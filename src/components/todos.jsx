import classes from "./todos.module.css";
import { FaRegTrashAlt } from "react-icons/fa";

const Todos = ({ todo, UpdateTodo, deleteTodo  }) => {
  const { Todo, completed, id } = todo;
  return (
    <li className={`${classes.wrapper} ${completed && classes.completed}`}>
      <div className={classes.todo}>
        <input type="checkbox" onChange={() => UpdateTodo(todo)} checked={completed && 'checked'} />
        <p onClick={() => UpdateTodo(todo)}>{Todo}</p>
      </div>
      <button className={classes.btn} onClick={() => deleteTodo(id)}>
        <FaRegTrashAlt />
      </button>
    </li>
  );
};

export default Todos;
