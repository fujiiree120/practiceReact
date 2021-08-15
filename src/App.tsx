import { FormControl, List, TextField } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import React, { useEffect, useState } from 'react';
import styles from "./App.module.css";
import TaskItem from "./TaskItem";
import { makeStyles } from "@material-ui/styles";
import { db } from "./firebase";
import { auth } from "./firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: "auto",
    width: "40%",
  },
});

const App: React.FC = (props: any) => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");
  const classes = useStyles();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login")
    });
    return () => unSub();
  });
  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection("tasks").add({ title: input });
    setInput("");
  }
  return (
    <div className={styles.app__root}>
      <h1>ToDo App</h1>
      <button
        className={styles.app__logout}
        onClick={
          async () => {
            try {
              await auth.signOut();
              props.history.push("login");
            } catch (error) {
              alert(error.message);
            }
          }
        }
      >
        <ExitToAppIcon></ExitToAppIcon>
      </button>
      <br></br>


      <FormControl>
        <TextField className={classes.field} label="New Task" value={input} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
     /**      <FormControl>
        <TextField className={classes.field} label="New Task" value={input} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>      <FormControl>
        <TextField className={classes.field} label="New Task" value={input} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>      <FormControl>
        <TextField className={classes.field} label="New Task" value={input} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List className={classes.list}>      <FormControl>
        <TextField className={classes.field} label="New Task" value={input} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>      <FormControl>
        <TextField className={classes.field} label="New Task" value={input} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List> */
    </div>
  );
}

export default App;
