import Background from "@/components/Background";
import PurpleSquare from "@/components/purpleSquare";
import WhiteSquare from "@/components/whiteSquare";
import colors from '@/theme/colors';
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";




export default function Settings(){
    return(
        <Background style={styles.separacaoAreas}>
            <PurpleSquare>
                <View style={styles.areasBotoesDoutor}>
                    <View style={styles.linksDoutor}>
                        <Link href={'/#'}>
                            <Ionicons name="call" size={64} color="white" />
                        </Link>
                        <Link href={'/#'}>
                            <Ionicons name="chatbubble" size={64} color="white" />
                        </Link>
                        <Link href={'/#'}>
                            <Ionicons name="keypad" size={64} color="white" />
                        </Link>
                    </View>
                    <View style={styles.risco}></View>
                    <Link href={'/#'} style={styles.listaDoutores}>
                        <Text>Lista de doutores</Text>
                    </Link>
                </View>
            </PurpleSquare>

            <WhiteSquare style={styles.separacaoAreas}>
                <Link href="/settings/perfil" style={styles.botoesAreaBranca}>
                    <Text>Perfil</Text>
                </Link>
                {/* <Link href="/settings/regiao" style={styles.botoesAreaBranca}>
                    <Text>Região</Text>
                </Link> */}
                <Link href="/settings/privacidade" style={styles.botoesAreaBranca}>
                    <Text>Privacidade</Text>
                </Link>
                <Link href="/settings/sobre" style={styles.botoesAreaBranca}>
                    <Text>Sobre nós</Text>
                </Link>
            </WhiteSquare>
        </Background>
    );
}

const styles = StyleSheet.create({

    areasBotoesDoutor: {
        display: 'flex',
        flexDirection: 'column'
    },

    linksDoutor: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },

    risco: {
        width: '100%',
        height: 2,
        backgroundColor: 'white',
        marginVertical: 24,
    },

    listaDoutores: {
        color: 'white',
        borderWidth: 2,
        borderColor: 'white',
        paddingVertical: 18,
        textAlign: 'center',
        borderRadius: 20,
        fontWeight: 'bold'
    },

    separacaoAreas: {
        gap: 22,
    },

    botoesAreaBranca: {
        color: colors.primary,
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 30,
        textAlign: 'center',
        padding: 10,
        fontSize: 16
    }
})