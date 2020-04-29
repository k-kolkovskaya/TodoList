import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/dist/MaterialIcons";

import { IAddItemProps } from "./IAddItemProps";

import theme from "../../styles/theme.style";

const addItem: React.SFC<IAddItemProps> = (props) => {
    return (
        <View>
            <TouchableOpacity style={styles.btn} onPress={props.addItem}>
                <Icon name="add" size={20} style={styles.btnIcon} color={theme.LIGHTGREY_COLOR} />
                <Text style={styles.btnText}>
                    List Item
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        fontSize: 16
    },
    btn: {
        padding: 9,
        paddingLeft: 68,
        flexDirection: "row",
        margin: 5
    },
    btnIcon: {
        marginRight: 30
    },
    btnText: {
        color: theme.LIGHTGREY_COLOR,
        fontSize: theme.FONT_SIZE_MEDIUM,
    }
});

export default addItem;