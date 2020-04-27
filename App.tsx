import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, Alert } from "react-native";
import 'react-native-get-random-values';
import { uuid } from 'uuidv4';

import Header from "./components/Header/Header";
import ListItem from "./components/ListItem/ListItem";
import AddItem from "./components/AddItem/AddItem";

const app = () => {

    const [items, setItems] = useState([
        { id: uuid(), text: "Milk" },
        { id: uuid(), text: "Bread" },
        { id: uuid(), text: "Shugar" },
        { id: uuid(), text: "Salt" },
        { id: uuid(), text: "Water" },
    ]);

    const deleteItemHandler = (id: string) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id !== id);
        });
    }

    const addItemHandler = (text: string) => {
        if (!text) {
            Alert.alert("Error", "Please enter the text")
        } else {
            setItems(prevItems => {
                return [{ id: uuid(), text }, ...prevItems]
            })
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <AddItem addItem={addItemHandler} />
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <ListItem item={item} deleteItem={deleteItemHandler} />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default app;