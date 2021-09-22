import {Alert, StyleSheet, Text, TextInput, TouchableHighlight} from "react-native";
import React from "react";

const AddForm = (props) => {

    const tasks = props.tasks;
    const setTasks = props.setTasks;

    const getNewTask = (task) => {
        props.setNewTask(task);
    }


    const updateTaskItems = (task, task_id) => {
        const onFlyTask = {...task, id: task_id.toString()}
        setTasks((prevTasks) => {
            return [
                ...prevTasks,
                onFlyTask,
            ]
        })
        props.setNewTask("");
    }

    const onAddPress = () => {
        const taskName = props.newTask;
        const task = {
            title:taskName,
            completed:false
        };

        if(taskName.length > 4){
          let taskCreateUrl = `http://192.168.1.11:8000/api/task/create/`;
            fetch(taskCreateUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
        else{
          Alert.alert("OOPS!", "Task name should be more than 5 characters long.", [
            {text:"Understood"}
          ])
        }
    }


    return(
        <>
            <TextInput
                value={props.newTask}
                placeholder="Task Name"
                placeholderTextColor="#007BFF"
                color="#007BFF"
                fontWeight="bold"
                style={addFormStyle.textInput}
                onChangeText={getNewTask}
                multiline
            />
            <TouchableHighlight
                style={addFormStyle.addBtn}
                onPress={onAddPress}
            >
                <Text style={addFormStyle.addBtnText}>+</Text>
            </TouchableHighlight>
        </>
    )
}
export default AddForm;

const addFormStyle = StyleSheet.create({
    textInput: {
        // borderColor: "#88BBE0",
        width:300,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#007BFF",
        padding: 10,
        fontSize: 16,
        shadowColor: "#007BFF",

    },
    addBtn:{
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: "#007BFF",
        borderColor: "#007BFF",
        padding: 10,
        margin: 5,
        width: 50,
        height:50,
    },
    addBtnText: {
        color:"white",
        fontWeight: "bold",
        fontSize: 17,
        textAlign: "center",

    }
})