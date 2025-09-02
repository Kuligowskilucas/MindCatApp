import colors from '@/theme/colors';
import { StyleSheet, View, ViewStyle } from "react-native";


type WhiteSquareProps = {
    children: React.ReactNode;
    style?: ViewStyle;
}

export default function WhiteSquare({children, style}: WhiteSquareProps){

    return(
        <View style={[styles.whiteSquare, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({

    whiteSquare:{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.primary
    }
});