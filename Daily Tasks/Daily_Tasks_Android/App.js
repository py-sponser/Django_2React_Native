import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, TouchableOpacity, Alert} from 'react-native';
import {Platform} from "react-native-web";
import TaskList from "./Components/TaskList";
import TaskForm from "./Components/TaskForm";
import TaskAppHeader from "./Components/TaskAppHeader"

export default function App() {

  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTasktoEdit] = useState({title: "", id: ""});
  const [newTask, setNewTask] = useState();
  const [isLoading, setIsLoading] = useState(true);


      useEffect(() => {
        const tasksUrl = "http://192.168.1.11:8000/api/tasks/";
        fetch(tasksUrl, {
            method: "POST",
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
                setTasks([...queriedTasks]);
                setIsLoading(false);
                console.log(queriedTasks);
            })
      }, [])




  return (
      <View style={styles.container}>
        <TaskAppHeader />
        <TaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            taskToEdit={taskToEdit}
            setTaskToEdit={setTasktoEdit}
            setTasks={setTasks}
            tasks={tasks}
        />
        <TaskList
            tasks={tasks}
            setTasks={setTasks}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            taskToEdit={taskToEdit}
            setTaskToEdit={setTasktoEdit}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eff5f7",
    marginTop: 25,
    alignItems: "center",
    flex: 1,
  },
  text:{
    color: "red",
    fontSize: 17,
    fontWeight: "bold",
    padding: 10,
    margin: 10,
    backgroundColor: "pink",
  },
  // inputText:{
  //   borderWidth: 1,
  //   borderColor: "pink",
  //   color: "pink",
  //   fontWeight: "bold",
  //   padding: 8,
  //   margin: 10,
  //   width: 250,
  // }
});