import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IListItemProps } from "./IListItemProps";
import Icon from "react-native-vector-icons/dist/FontAwesome";

const listItem: React.SFC<IListItemProps> = (props) => {
    return (
        <TouchableOpacity style={styles.ListItem}>
            <View style={styles.ListItemView}>
                <Text style={styles.ListItemText}>
                    {props.item.text}
                </Text>
                <Icon name="remove" size={20} color="firebrick" onPress={() => props.deleteItem(props.item.id)} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ListItem: {
        padding: 15,
        backgroundColor: "#f8f8f8",
        borderBottomWidth: 1,
        borderColor: "#eee"
    },
    ListItemView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    ListItemText: {
        fontSize: 18
    }
});


export default listItem;