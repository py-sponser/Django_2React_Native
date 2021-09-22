import {formStyles} from "./Forms";
import {csrftoken} from "../../CsrfToken";

const EditForm = (props) => {
    const taskToEdit = props.taskToEdit;
    const setTaskToEdit = props.setTaskToEdit;
    const getTaskEditTitle = (event) => {
        setTaskToEdit({...taskToEdit, title:event.target.value});
    }

    const onEditFormSubmit = (event) => {
        event.preventDefault();
        const update = () => {
            const newTasks = props.tasks.map((task) => {
                return task.id === taskToEdit.id ? {id:taskToEdit.id, title:taskToEdit.title} : task;
            })
            props.setTasks(newTasks);
            props.setIsEditing(false);
        }



        let taskEditUrl = `http://192.168.1.11:8000/api/task/${taskToEdit.id}/update/`;
        fetch(taskEditUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({title:taskToEdit.title}),
        })
            .then(response => response.json())
            .then((data) => {
                if(data){
                    update();
                }
            })
    }


    return(
        <div style={formStyles.formWrapper} onSubmit={onEditFormSubmit}>
            <form action="" className="form">
                <label htmlFor="">
                    <input
                        type="text"
                        style={formStyles.textInput}
                        placeholder="New Task"
                        className="text-input"
                        autoFocus="true"
                        onChange={getTaskEditTitle}
                        value={taskToEdit.title}
                    />
                </label>
                <label htmlFor="">
                    <input style={formStyles.submitBtn} type="submit" value="OK" className="btn btn-primary submit-btn" />
                </label>
            </form>
        </div>
    )
}

export default EditForm;