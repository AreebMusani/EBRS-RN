import {StyleSheet} from 'react-native';
import colors from '../../configs/colors';
import fontSizes from '../../configs/fontSizes';

const styles = StyleSheet.create({
    inputContainer: (error) => ({
        // flex: 1,
        flexShrink: 1,      //NEW
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 3,
        backgroundColor: "rgba(50, 34, 81, 1)", //#322251
        borderStyle: "solid",
        borderColor: error ? "red" : colors.TEXT,
        borderWidth: 1,
        width: "100%",
        overflow: "hidden",
        // marginVertical: 10
    }),
    
    inputField: {
        borderWidth: 0,
        flex: 1,
        flexGrow: 1,
        overflow: "hidden",
        color: colors.TEXT,
        fontSize: fontSizes.text2
    },

    error: {
        color: "red",
        fontSize: fontSizes.text3
    }
})

export default styles;