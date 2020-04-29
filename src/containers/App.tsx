import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, Alert } from "react-native";
import 'react-native-get-random-values';
import { uuid } from 'uuidv4';

import Header from "../components/Header/Header";
import ListItem from "../components/ListItem/ListItem";
import AddItem from "./AddItem/AddItem";

const app = () => {

    const [items, setItems] = useState([
        { id: uuid(), text: "Task 1", editMode: false, completed: false },
        { id: uuid(), text: "Task 2", editMode: false, completed: false },
        { id: uuid(), text: "Borrow some worms from Сhristina for dinner", editMode: false, completed: false },
    ]);

    const deleteItemHandler = (id: string) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id !== id);
        });
    }

    const editModeOnHandler = (id: string) => {
        setItems(prevItems => {
            prevItems.forEach(item => {
                if (item.id === id) {
                    item.editMode = true;
                }
            })
            return [...prevItems]
        });
    }

    const editModeOffHandler = (id: string, text: string) => {
        setItems(prevItems => {
            prevItems.forEach(item => {
                if (item.id === id) {
                    if (!text) {
                        Alert.alert("Error", "Please enter the text")
                    } else {
                        item.editMode = false;
                        item.text = text;
                    }
                }
            })
            return [...prevItems]
        });
    }

    const addItemHandler = () => {
        setItems(prevItems => {
            return [...prevItems, { id: uuid(), text: "", editMode: true, completed: false }]
        })
    }

    return (
        <View>
            <Header />
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <ListItem
                        item={item}
                        deleteItem={deleteItemHandler}
                        editModeOn={editModeOnHandler}
                        editModeOff={editModeOffHandler} />
                )}
                keyExtractor={item => item.id}
            />
            <AddItem addItem={addItemHandler} />
        </View>
    )
}

export default app;