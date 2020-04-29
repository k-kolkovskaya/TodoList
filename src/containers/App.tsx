import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, Alert } from "react-native";
import 'react-native-get-random-values';
import { uuid } from 'uuidv4';

import styles from "./App.style";
import theme from "../styles/theme.style";

import Header from "../components/Header/Header";
import ListItem from "../components/ListItem/ListItem";
import AddItem from "./AddItem/AddItem";
import Icon from "react-native-vector-icons/dist/MaterialIcons";

const app = () => {

    const [items, setItems] = useState([
        { id: uuid(), text: "Task 1", editMode: false, completed: true, newItem: false },
        { id: uuid(), text: "Task 2", editMode: false, completed: false, newItem: false },
        { id: uuid(), text: "Borrow some worms from Сhristina for dinner", editMode: false, completed: false, newItem: false },
    ]);

    const [showCompleted, setShowCompleted] = useState(true);

    const inCompletedItems = items.filter(item => !item.completed);
    const completedItems = items.filter(item => item.completed);

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
                        if (item.newItem) {
                            addItemHandler();
                            item.newItem = false;
                        }
                    }
                }
            })
            return [...prevItems]
        });
    }

    const addItemHandler = () => {
        setItems(prevItems => {
            return [...prevItems, { id: uuid(), text: "", editMode: true, completed: false, newItem: true }]
        })
    }

    const checkBoxHandler = (id: string) => {
        setItems(prevItems => {
            prevItems.forEach(item => {
                if (item.id === id) {
                    item.completed = !item.completed;
                }
            })
            return [...prevItems]
        });
    }

    const showCompletedHandler = () => {
        setShowCompleted(!showCompleted);
    }

    return (
        <View>
            <Header />
            <FlatList
                data={inCompletedItems}
                renderItem={({ item }) => (
                    <ListItem
                        item={item}
                        deleteItem={deleteItemHandler}
                        editModeOn={editModeOnHandler}
                        editModeOff={editModeOffHandler}
                        checkBoxChange={checkBoxHandler} />
                )}
                keyExtractor={item => item.id}
            />
            <AddItem addItem={addItemHandler} />
            {completedItems.length !== 0
                ? <View style={styles.completedContainer}>
                    <View style={styles.completedHeader}>
                        <Icon
                            name={showCompleted ? "keyboard-arrow-down" : "keyboard-arrow-up"}
                            size={24}
                            style={styles.completedIcon}
                            color={theme.LIGHTGREY_COLOR}
                            onPress={showCompletedHandler}
                        />
                        <Text style={styles.completedText} onPress={showCompletedHandler}>{`${completedItems.length} Checked ${completedItems.length === 1
                            ? "Item"
                            : "Items"}`}</Text>
                    </View>
                    {showCompleted
                        ? <FlatList
                            data={completedItems}
                            renderItem={({ item }) => (
                                <ListItem
                                    item={item}
                                    deleteItem={deleteItemHandler}
                                    editModeOn={editModeOnHandler}
                                    editModeOff={editModeOffHandler}
                                    checkBoxChange={checkBoxHandler} />
                            )}
                            keyExtractor={item => item.id}
                        />
                        : null}

                </View>
                : null
            }

        </View>
    )
}

export default app;