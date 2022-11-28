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
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

import { selectCurrentUser } from "../redux/userSelector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useState } from "react";
import { useEffect } from "react";

const TodoList = ({currentUser}) => {

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    let timerId = setInterval(()=>{
      setError('');
    }, 3000)
    return () => clearTimeout(timerId);
  },[])
  
  //create
  const createTodo = async ({ e, currentUser }) => {
    e.preventDefault();
    const todoId =  Date.now();
    console.log({id:currentUser.id, todoId});
  
    if(input === '' || input.trim() === ''){
      setError('input cannot be empty');
      return;
    }
    try {
      await setDoc(doc(db, 'users', currentUser.id, 'todos', todoId.toString()), {
        Todo: input,
        completed: false,
        id: todoId
      })
      setInput('');
    } catch (error) {
      setError('unkwown error please try again');
    }
  };

  //read
  useEffect(() => {
    const queryDoc = query(collection(db, "users", currentUser.id, "todos"));
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
      await updateDoc(doc(db, "users", currentUser.id, "todos", todo.id), {
        completed: !todo.completed,
      });
    } catch (error) {
      setError('please try again')
    }
  };

  //delete
  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "users", currentUser.id, "todos", id));
    } catch (error) {
      setError('please try again')
    }
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.heading}>welcome! start creating your todo </h1>
      <div className={classes.todoWrapper}>
        <h1 className={classes.title}>add todo</h1>
        {error ? <p className={classes.error}>{error}</p> : ""}
        <form className={classes.form} onSubmit={ (e) => createTodo({e, currentUser}) }>
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
