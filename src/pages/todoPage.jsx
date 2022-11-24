import classes from "./todoPage.module.css";
import InputForm from "../components/inputForm";
import CustomButton from "../components/customButton";
import { AiOutlinePlus } from "react-icons/ai";
import Todos from "../components/todos";

import {
  onSnapshot,
  query,
  collection,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

import { selectCurrentUser } from "../redux/userSelector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useState } from "react";
import { useEffect } from "react";

const TodoList = (currentUser) => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  //create
  const createTodo = async (e) => {
    e.preventDefault();
    if(input === '' || input.trim() === ''){
      setError('input cannot be empty');
      return;
    }
    try {
      await addDoc(collection(db, 'todos'), {
        Todo: input,
        completed: false
      })
      setInput('');
    } catch (error) {
      setError('unkwown error please try again')
    }
  };

  //read
  useEffect(() => {
    const queryDoc = query(collection(db, 'todos'));
    const getSnapShot = onSnapshot(queryDoc, (querySnapShot) => {
      let todosArray = [];
      querySnapShot.forEach((doc) => {
        todosArray.push({...doc.data(), id: doc.id})
      })
      setTodos(todosArray);
    });
    return () => getSnapShot();
  },[]);

  //update
  const UpdateTodo = async (todo) => {
    try {
      await updateDoc(doc(db, 'todos', todo.id), {
        completed: !todo.completed   
      })
    } catch (error) {
      setError('please try again')
    }
  };

  //delete
  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id))
    } catch (error) {
      setError('please try again')
    }
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.heading}>welcome, start creating your todo </h1>
      <div className={classes.todoWrapper}>
        <h1 className={classes.title}>add todo</h1>
        {error ? <p className={classes.error}>{error}</p> : ""}
        <form className={classes.form} onSubmit={createTodo}>
          <InputForm
            isTodo
            placeholder="Add Todo"
            type="text"
            value={input}
            handleChange={handleInput}
          />
          <CustomButton isTodo>
            <AiOutlinePlus className={classes.icon} />
          </CustomButton>
        </form>
        <ul className={classes.todolist}>
          {todos.map((todo, index) => {
            return (
              <Todos
                key={index}
                todo={todo}
                UpdateTodo={UpdateTodo}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </ul>
        {todos.length ? (
          <p className={`${classes.length} ${todos.length && classes.blue}`}>you have {todos.length} todos</p>
        ) : (
          <p className={classes.length}>oops!! you don't have any todos yet</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(TodoList);
