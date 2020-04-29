import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { IListItemProps } from "./IListItemProps";
import Icon from "react-native-vector-icons/dist/MaterialIcons";

import theme from '../../styles/theme.style';

const listItem: React.SFC<IListItemProps> = (props) => {

    const [text, setText] = useState(props.item.text);

    const onChange = (textValue: string) => {
        setText(textValue);
    }

    return (
        <TouchableOpacity style={styles.ListItem}>
            <View style={styles.ListItemView}>
                <View style={styles.ListItemContainer}>
                    <Icon
                        name="drag-handle"
                        size={20}
                        color={theme.LIGHTGREY_COLOR}
                        style={styles.ListItemDrag}
                    />
                    <CheckBox
                        tintColors={{ true: theme.LIGHTGREY_COLOR, false: theme.SECONDARY_COLOR }}
                        style={styles.ListItemCheckbox}
                        value={props.item.completed}
                        disabled={props.item.completed}
                        onChange={() => props.checkBoxChange(props.item.id)}
                    />
                    {props.item.editMode
                        ? <TextInput
                            placeholder="Add Item..."
                            value={text}
                            autoFocus
                            style={styles.ListItemInput}
                            onChangeText={onChange}
                            onSubmitEditing={() => props.editModeOff(props.item.id, text)}
                        />
                        : <Text
                            style={props.item.completed
                                ? styles.ListItemTextDisabled
                                : styles.ListItemText}
                            onPress={() => props.editModeOn(props.item.id)}
                        >
                            {props.item.text}
                        </Text>}
                </View>
                {props.item.editMode
                    ? <Icon name="close" size={24} color={theme.SECONDARY_COLOR} onPress={() => props.deleteItem(props.item.id)} />
                    : null}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ListItem: {
        paddingVertical: 16,
        paddingHorizontal: 23,
    },
    ListItemView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    ListItemContainer: {
        width: 240,
        flexDirection: "row",
        alignItems: "flex-start"
    },
    ListItemDrag: {
        marginRight: 24
    },
    ListItemCheckbox: {
        marginRight: 24
    },
    ListItemText: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.TEXT_COLOR,
        lineHeight: 24,
        padding: 0
    },
    ListItemTextDisabled: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.LIGHTGREY_COLOR,
        lineHeight: 24,
        padding: 0,
        textDecorationLine: 'line-through',
        textDecorationStyle: "solid"
    },
    ListItemInput: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.TEXT_COLOR,
        lineHeight: 24,
        padding: 0
    }
});


export default listItem;