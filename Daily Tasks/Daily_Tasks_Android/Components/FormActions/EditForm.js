import {StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import React from "react";

const EditForm = (props) => {

    const inputToEditHandler = (editedTask) => {
        props.setTaskToEdit({...props.taskToEdit, title:editedTask});
    }



    const onFinishEditPress = () => {
        const update = () => {
            const updatedTasks = props.tasks.map((task) => {
                return props.taskToEdit.id === task.id ? props.taskToEdit : task;
            })
            props.setTasks(updatedTasks)
            props.setIsEditing(false)
        }


        let taskEditUrl = `http://192.168.1.11:8000/api/task/${props.taskToEdit.id}/update/`;
        fetch(taskEditUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title:props.taskToEdit.title}),
        })
            .then(response => response.json())
            .then((data) => {
                if(data){
                    update()
                }
            })

    }



    return(
        <>
            <TextInput
                value={props.taskToEdit.title}
                placeholder="Task Name"
                placeholderTextColor="#007BFF"
                color="#007BFF"
                fontWeight="bold"
                style={editFormStyle.textInput}
                onChangeText={inputToEditHandler}
                multiline
            />
            <TouchableHighlight
                style={editFormStyle.addBtn}
                onPress={onFinishEditPress}
            >
                <Text style={editFormStyle.addBtnText}>OK</Text>
            </TouchableHighlight>
        </>
    )
}
export default EditForm;

const editFormStyle = StyleSheet.create({
    textInput: {
        // borderColor: "#88BBE0",
        width:300,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#007BFF",
        padding: 10,
        fontSize: 16,
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