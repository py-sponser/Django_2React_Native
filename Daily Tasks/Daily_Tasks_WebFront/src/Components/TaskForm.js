import {useState} from "react";
import AddFrom from "./FormActions/AddFrom";
import EditForm from "./FormActions/EditForm";

const TaskForm = (props) => {

    const [taskEntered, setEnteredTask] = useState("");
    const tasks = props.tasks;
    const setTasks = props.setTasks;

    return(
        <div>
            {
                props.isEditing ? (
                    <EditForm
                        taskToEdit={props.taskToEdit}
                        setTaskToEdit={props.setTaskToEdit}
                        tasks={tasks}
                        setTasks={setTasks}
                        isEditing={props.isEditing}
                        setIsEditing={props.setIsEditing}
                    />
                ) : (
                    <AddFrom
                        setEnteredTask={setEnteredTask}
                        taskEntered={taskEntered}
                        tasks={tasks}
                        setTasks={setTasks} />

                )
            }

        </div>
    )
}

export default TaskForm;