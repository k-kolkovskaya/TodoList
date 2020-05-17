import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, Alert } from "react-native";
import 'react-native-get-random-values';
import axios from "../axios-items";

import styles from "./App.style";
import theme from "../styles/theme.style";

import Header from "../components/Header/Header";
import ListItem from "../components/ListItem/ListItem";
import AddItem from "./AddItem/AddItem";
import Icon from "react-native-vector-icons/dist/MaterialIcons";

import { IItem } from "../entities/Item";

const app = () => {

    const [items, setItems] = useState<IItem[] | undefined>(undefined);

    const [showCompleted, setShowCompleted] = useState(true);

    console.log(items);



    useEffect(() => {
        const fetchDataAsync = async () => {
            await axios.get('/items.json')
                .then(res => {
                    const fetchedItems: IItem[] = [];
                    for (let key in res.data) {
                        fetchedItems.push({
                            ...res.data[key],
                            id: key
                        })
                    }
                    setItems(fetchedItems)
                })
                .catch(e => Alert.alert("Error", e.text));
        }
        fetchDataAsync()
    }, []);

    let inCompletedItems = items ? items.filter(item => !item.completed) : [];
    let completedItems = items ? items.filter(item => item.completed) : [];

    const deleteItemHandler = (id: string) => {
        axios.delete(`/items/${id}.json`);
        setItems(prevItems => {
            return prevItems ? prevItems.filter(item => item.id !== id) : prevItems;
        });
    }

    const editModeOnHandler = (id: string) => {
        setItems(prevItems => {
            prevItems ? prevItems.forEach(item => {
                if (item.id === id) {
                    item.editMode = true;
                    axios.put(`/items/${id}.json`, item);
                }
            }) : prevItems
            return prevItems ? [...prevItems] : prevItems
        });
    }

    const editModeOffHandler = (id: string, text: string) => {
        setItems(prevItems => {
            prevItems ? prevItems.forEach(item => {
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
                        axios.put(`/items/${id}.json`, item);
                    }
                }
            }) : prevItems
            return prevItems ? [...prevItems] : prevItems
        });
    }

    const addItemHandler = async () => {
        const response = await fetch("https://to-do-list-c1ef9.firebaseio.com/items.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: "", editMode: true, completed: false, newItem: true })
        })

        const data = await response.json();
        setItems(prevItems => {
            return prevItems ? [...prevItems, { id: data.name, text: "", editMode: true, completed: false, newItem: true }] : [{ id: data.name, text: "", editMode: true, completed: false, newItem: true }]
        })
    }

    const checkBoxHandler = (id: string) => {
        setItems(prevItems => {
            prevItems ? prevItems.forEach(item => {
                if (item.id === id) {
                    item.completed = !item.completed;
                    axios.put(`/items/${id}.json`, item)
                        .catch(e => Alert.alert("Error", e));
                }
            }) : prevItems
            return prevItems ? [...prevItems] : prevItems
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