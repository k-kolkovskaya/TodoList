import { StyleSheet } from "react-native";
import theme from "../styles/theme.style";

export default StyleSheet.create({
    completedContainer: {
        paddingHorizontal: 16,
        marginTop: 20
    },
    completedHeader: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.12)',
        paddingTop: 25,
        flexDirection: "row"
    },
    completedText: {
        fontSize: theme.FONT_SIZE_MEDIUM,
        color: theme.LIGHTGREY_COLOR
    },
    completedIcon: {
        marginRight: 30
    }
})