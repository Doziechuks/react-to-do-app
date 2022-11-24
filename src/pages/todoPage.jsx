import classes from './todoPage.module.css';
import InputForm from '../components/inputForm';
import CustomButton from '../components/customButton';
import { AiOutlinePlus } from "react-icons/ai";
import Todos from '../components/todos';

import { selectCurrentUser } from '../redux/userSelector';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useState } from 'react';

const TodoList = (currentUser) => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const handleInput = (e) => {
    setInput(e.target.value);
  }
  //create
  //read
  //update
  //delete
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.heading}>welcome, start creating your todo </h1>
      <div className={classes.todoWrapper}>
        <h1 className={classes.title}>add todo</h1>
        <form className={classes.form}>
          <InputForm isTodo placeholder='Add Todo' type='text' value={input} handleChange={handleInput} />
          <CustomButton isTodo>
            <AiOutlinePlus className={classes.icon} />
          </CustomButton>
        </form>
        <ul className={classes.todolist}>
          {
            todos.map((todo, index) => {
              <Todos key={index} todo= {todo} />
            })
          }
        </ul>
      </div>
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(TodoList);