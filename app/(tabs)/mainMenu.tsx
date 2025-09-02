import Background from "@/components/Background";
import MainMenuButton from "@/components/mainMenuButton";
import PurpleSquare from "@/components/purpleSquare";
import colors from '@/theme/colors';
import { StyleSheet, Text, View } from 'react-native';


export default function mainMenu() {
    return(
        <Background center style={styles.containerPrincipal}>
            <PurpleSquare>
                <Text style={styles.textoHumor}>
                    Veja como está seu gráfico de humor
                </Text>
            </PurpleSquare>
            <View style={styles.areaBotao}>
                <MainMenuButton link='/diary' icon={require('@/assets/images/livro.png')} title="Atividades">
                    Recomendação do gatinho para hoje
                </MainMenuButton>
                <MainMenuButton link='/diary' icon={require('@/assets/images/diario.png')} title="Diário">
                    Desabafe e deixe o gatinho te ajudar
                </MainMenuButton>
                <MainMenuButton link='/diary' icon={require('@/assets/images/calendario.png')} title="Como foi seu dia?">
                    Conte como foi seu dia
                </MainMenuButton>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({

    containerPrincipal: {
        gap: 15
    },

    graficoHumor: {
        backgroundColor: colors.primary,
        padding: 20,
        borderRadius: 20,
        
    },

    textoHumor: {
        color: 'white',
        fontSize: 16,
        width: '100%',
    },

    areaBotao: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: 10
    }
});