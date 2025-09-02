import colors from '@/theme/colors';
import { StyleSheet, View, ViewStyle } from "react-native";


type PurpleSquareProps = {
    children: React.ReactNode;
    style?: ViewStyle;
}

export default function PurpleSquare({children, style}: PurpleSquareProps){

    return(
        <View style={[styles.purpleSquare, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({

    purpleSquare:{
        backgroundColor: colors.primary,
        padding: 20,
        borderRadius: 20,
    }
});