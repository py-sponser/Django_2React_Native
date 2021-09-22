import {formStyles} from "./Forms";
import {useState} from "react";
import {csrftoken} from "../../CsrfToken";

const AddFrom = (props) => {

    const tasks = props.tasks;
    const setTasks = props.setTasks;
    const setEnteredTask = props.setEnteredTask;
    const taskEntered = props.taskEntered;

    const [alertMsg, setAlertMsg] = useState(false);

    const getTaskTitle = (event) => {
        setEnteredTask(event.target.value);
    }

    const updateTaskItems = (task, task_id) => {
        setAlertMsg(false)
        const onFlyTask = {...task, id: task_id.toString()}
        setTasks((prevTasks) => {
            return [
                ...prevTasks,
                onFlyTask,
            ]
        })
        setEnteredTask("");
    }

    const onAddFormSubmit = (event) => {
        event.preventDefault();
        const task = {
            title: taskEntered,
            completed: false,
        }
        if (task.title.length < 4) {
            setAlertMsg(true)
        } else {
            let taskCreateUrl = `http://192.168.1.11:8000/api/task/create/`;
            fetch(taskCreateUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({title:task.title, completed:task.completed}),
            })
                .then(response => response.json())
                .then((data) => {
                    if(data[0]){
                        updateTaskItems(task, data[1])
                    }
                })
        }





    }

    return (
        <div style={formStyles.formWrapper} onSubmit={onAddFormSubmit}>
            <form action="" className="form">
                <label htmlFor="">
                    <input
                        type="text"
                        placeholder="New Task"
                        className="text-input"
                        style={formStyles.textInput}
                        onChange={getTaskTitle}
                        value={taskEntered}
                        autoFocus="true"
                    />
                </label>
                <label htmlFor="">
                    <input style={formStyles.submitBtn} type="submit" value="+" className="btn btn-primary submit-btn" />
                </label>
                {
                    alertMsg ? (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                Task characters must be more than 3.
                                <button type="button" className="btn-close" data-bs-dismiss="alert"
                                        aria-label="Close">

                                </button>
                            </div>
                        )
                        : <></>
                }

            </form>
        </div>
    )
};


export default AddFrom;