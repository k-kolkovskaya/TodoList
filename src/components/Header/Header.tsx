import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/MaterialIcons";

import theme from '../../styles/theme.style';

import { IHeaderProps } from "./IHeaderProps";

const header: React.SFC<IHeaderProps> = (props) => {
    return (
        <View style={styles.header}>
            <Icon name="dehaze" size={20} color="white" />
            <Text style={styles.text}>{props.title}</Text>
            <Icon name="edit" size={20} color="white" />
        </View>
    )
}

header.defaultProps = {
    title: "My New List"
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        paddingVertical: 15,
        paddingHorizontal: 19,
        backgroundColor: theme.PRIMARY_COLOR,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "500"
    }
});

export default header;