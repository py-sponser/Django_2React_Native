import TaskForm from "./Components/TaskForm";
import TaskItem from "./Components/TaskItem";
import {useEffect, useState} from "react";
import "./App.css"
import {csrftoken} from "./CsrfToken";

function App() {

    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState({id:"", title:""});

    useEffect(() => {

        const tasksUrl = "http://192.168.1.11:8000/api/tasks/";
        fetch(tasksUrl, {
            method: "POST",

            headers: {
                'X-CSRFToken': csrftoken,
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const queriedTasks = [];
                for(const dict of data){
                    dict.id = dict.id.toString()
                    queriedTasks.push(dict);
                }
                setTasks(queriedTasks);
                setIsLoading(false);
                console.log(queriedTasks);
            })
    }, [])


  return (
    <div className="container">
        {
            isLoading ? (
                <div className="spinner-border text-primary spinner-location" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <>
                    <div className="header-wrapper">
                        <h1>Daily Tasks</h1>
                    </div>

                    <TaskForm
                        taskToEdit={taskToEdit}
                        setTaskToEdit={setTaskToEdit} isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        setTasks={setTasks}
                        tasks={tasks}
                    />
                    <TaskItem
                        taskToEdit={taskToEdit}
                        setTaskToEdit={setTaskToEdit}
                        tasks={tasks}
                        setTasks={setTasks}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    />
                </>
            )
        }
    </div>
  );
}

export default App;
