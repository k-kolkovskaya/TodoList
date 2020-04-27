import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { IHeaderProps } from "./IHeaderProps";

const header: React.SFC<IHeaderProps> = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

header.defaultProps = {
    title: "Shopping List"
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        padding: 15,
        backgroundColor: "darkslateblue"
    },
    text: {
        color: "white",
        fontSize: 23,
        textAlign: "center"
    }
});

export default header;