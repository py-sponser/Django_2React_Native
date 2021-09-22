import { FaRegEdit } from "react-icons/fa";
import "./TaskItem.css"
import {csrftoken} from "../CsrfToken";


const TaskItem = (props) => {

    const setTasks = props.setTasks;
    const tasks = props.tasks;

    const onTaskPress = (taskId) => {
        let taskStatus;
        const newTasks = tasks.map((task) => {
            if(task.id === taskId){
                if(task.completed === true){
                    const newTask = {...task, completed: false}
                    taskStatus = newTask.completed;
                    return newTask;
                }
                else{
                    const newTask = {...task, completed: true}
                    taskStatus = newTask.completed;
                    return newTask;
                }
            }
            else{
                return task;
            }
        })
        setTasks(newTasks);

        let taskEditUrl = `http://192.168.1.11:8000/api/task/${taskId}/update/`;
        fetch(taskEditUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({completed:taskStatus}),
        })
    }

    const onDeleteBtnPress = (taskId) => {
        const updateTasks = () => {
            const newTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(newTasks)
        }


        let taskDelUrl = `http://192.168.1.11:8000/api/task/${taskId}/delete/`;
        fetch(taskDelUrl, {
            method: "DELETE",
            headers: {
                'X-CSRFToken': csrftoken,
            },
        })
            .then(response => response.json())
            .then((data) => {
                if(data === true){
                    updateTasks();
                }
            })
    }

    const onEditBtnPress = (task_to_edit) => {
        props.setIsEditing(true);
        props.setTaskToEdit({...task_to_edit});
    }


    return(
        <div className="tasks-wrapper">
            <ul>
                {tasks.slice(0).reverse().map((task) => {
                    return(
                        <li className="task-item" key={task.id.toString()}>
                            <div className="task-name">
                                <button
                                    type="button"
                                    onClick={() => {
                                        onTaskPress(task.id);
                                    }}
                                        className="task-name-btn">
                                    {
                                        task.completed ? (
                                            <span key={task.id} className="task-name-text-striked">{task.title}</span>
                                        ) : (
                                            <span key={task.id} className="task-name-text">{task.title}</span>
                                        )
                                    }
                                </button>
                            </div>

                            <div className="task-actions">
                                <button className="edit taskBtns" onClick={() => {
                                    onEditBtnPress(task);
                                }}>
                                    <FaRegEdit className="editBtnIcon" />
                                </button>

                                <button className="del taskBtns" onClick={() => {
                                    onDeleteBtnPress(task.id)
                                } }>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                                         className="bi bi-trash" viewBox="0 0 16 16">
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd"
                                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
        )
}

export default TaskItem;