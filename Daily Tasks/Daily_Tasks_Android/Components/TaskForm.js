import {TextInput, View, StyleSheet, Button, TouchableHighlight, Text} from "react-native";
import React, {useState} from "react"
import AddForm from "./FormActions/AddForm";
import EditForm from "./FormActions/EditForm";

const TaskForm = (props) => {

    const isEditing = props.isEditing;


    return(
        <View style={formStyles.wrapper}>
            {
                isEditing ? (
                        <EditForm
                            taskToEdit={props.taskToEdit}
                            setTaskToEdit={props.setTaskToEdit}
                            setTasks={props.setTasks}
                            tasks={props.tasks}
                            setIsEditing={props.setIsEditing}
                        />
                    )


                    : (
                        <AddForm
                            setNewTask={props.setNewTask}
                            getTaskIdCreate={props.getTaskIdCreate}
                            newTask={props.newTask}
                            tasks={props.tasks}
                            setTasks={props.setTasks}
                        />

                    )
            }
        </View>
    )
}
export default TaskForm;

const formStyles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        width: 400,
        flexDirection: "row",
        justifyContent: "center",
    },
})