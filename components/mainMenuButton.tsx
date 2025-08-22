import colors from '@/theme/colors';
import { Href, Link } from "expo-router";
import { Image, ImageSourcePropType, StyleSheet, Text, View, ViewStyle } from "react-native";



type mainMenuButtonProps = {
    children: React.ReactNode;
    style?: ViewStyle;
    link: Href;
    icon: ImageSourcePropType;
    title: string;
}


export default function MainMenuButton({children, style, link, icon, title}: mainMenuButtonProps){
    return(
        <Link href={link} style={styles.container}>
            <View style={styles.areaBotao}>
                <View style={styles.areaTexto}>
                    <Text style={styles.textoTitulo}>{title}</Text>
                    <View style={styles.risco}></View>
                    <Text style={styles.texto}>{children}</Text>
                </View>
                <View>
                    <Image source={icon} resizeMode='contain' style={styles.imagem}/>
                </View>
            </View>
        </Link>
    );
}

const styles = StyleSheet.create({

    container: {
      backgroundColor: 'white',
      paddingHorizontal: 10,
      paddingVertical: 20,
      borderRadius: 25,
      width: '95%',
    },

    areaBotao: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: 15

    },

    areaTexto: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        gap: 5
    },

    texto: {
        color: colors.primary,
        fontSize: 13
    },

    textoTitulo: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 20
    },

    risco: {
        width: '100%',
        height: 2,
        backgroundColor: colors.primary
    },

    imagem:{
        width: 60,
        height: 60,
        backgroundColor: '#cbcbcb',
        padding: 11,
        borderRadius: '50%',
    }

});