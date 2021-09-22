import {FlatList, StyleSheet, TextInput, TouchableOpacity, View, Text, Button, TouchableHighlight} from "react-native";
import React from "react"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const TaskList = (props) => {
    const tasks = props.tasks;
    const setTasks = props.setTasks;

    const onTouchCompleteHandler = (taskId) => {
        let taskStatus;
        setTasks((prevTasks) => {
            prevTasks.map((task) => {
                if(task.id === taskId){
                    task.completed = task.completed !== true;
                    taskStatus = task.completed;
                }
            })
            return[
                ...prevTasks,
            ];
        })



        let taskDelUrl = `http://192.168.1.11:8000/api/task/${taskId}/update/`;
        fetch(taskDelUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({completed:taskStatus}),
        })
    }

    const onDeleteHandler = (taskId) => {
        const updateTasks = () => {
            const newTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(newTasks)
        }

        let taskDelUrl = `http://192.168.1.11:8000/api/task/${taskId}/delete/`;
        fetch(taskDelUrl, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then((data) => {
                if(data === true){
                    updateTasks();
                }
            })
    }

    const onEditPress = (title, id) => {
        const task_to_edit = {title:title, id:id}
        props.setTaskToEdit({...task_to_edit});
        props.setIsEditing(true);
    }

    return(
        <View style={tasksStyle.task_list_wrapper}>
            <FlatList keyExtractor={(item) => {
                return item.id;
            }} data={tasks.slice(0).reverse()} renderItem={({item}) => {
                return (
                    <TouchableOpacity
                        style={tasksStyle.task_wrapper}
                        activeOpacity={1}
                        onPress={() => {
                            onTouchCompleteHandler(item.id);
                        }}
                    >
                        {
                            item.completed ? (
                                <Text key={item.id} style={ [tasksStyle.task_name, tasksStyle.strikedText,] }>{item.title}</Text>
                            ) : (
                                <Text key={item.id} style={tasksStyle.task_name}>{item.title}</Text>
                            )
                        }
                        <View style={tasksStyle.BtnsWrapper} >
                            <TouchableHighlight
                                activeOpacity={1}
                                underlayColor="none"
                                style={tasksStyle.editBtn}
                                onPress={() => {
                                    onEditPress(item.title,item.id)
                                }}
                            >
                                <FontAwesome5 name="edit" size={30} color="#007BFF" />
                            </TouchableHighlight>
                            <TouchableHighlight style={tasksStyle.deleteIcon}
                                activeOpacity={1}
                                underlayColor="none"
                                onPress={() => {
                                    onDeleteHandler(item.id);
                                }}
                            >
                                <AntDesign  name="delete" size={32} color="#007BFF" />
                            </TouchableHighlight>
                        </View>
                    </TouchableOpacity>
                )
            }} />
        </View>
    )
}

export default TaskList;

const tasksStyle = StyleSheet.create({
    task_list_wrapper:{
        marginTop:20,
        flex: 1,

    },
    task_wrapper:{
        borderWidth: 1,
        borderColor: "#007BFF",
        borderRadius: 10,
        width: 350,
        padding: 10,
        margin:10,
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    task_name:{
        width: 210,
        fontSize: 16,
        fontWeight: "bold",
        color: "#007BFF",
        // textDecorationLine: "line-through",
        // textDecorationStyle: "solid",
    },
    BtnsWrapper:{
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    editBtn:{
        padding: 10,
        width: 60,
    },
    deleteIcon:{
        padding:10,
        width: 60,
    },
    strikedText: {
        textDecorationLine:"line-through",
        textDecorationStyle: "solid",
    }
})