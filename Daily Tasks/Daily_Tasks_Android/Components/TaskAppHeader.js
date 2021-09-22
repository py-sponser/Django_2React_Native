import {Text, View, StyleSheet} from "react-native";
import React from "react";

const TaskAppHeader = () => {
    return(
        <View style={headerStyles.header}>
            <Text style={headerStyles.headerText}>Daily Tasks</Text>
        </View>
    )
}
export default TaskAppHeader;

const headerStyles = StyleSheet.create({
    header:{
        backgroundColor: "#007BFF",
        width: "100%",
        height: 60,
        padding: 15,
    },
    headerText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",

    }
})