import Background from "@/components/Background";
import PurpleSquare from "@/components/purpleSquare";
import { StyleSheet, Text } from 'react-native';

export default function Privacidade(){
    return(
        <Background>
            <PurpleSquare>
                <Text style={styles.titulo}>
                    Política de Privacidade
                </Text>
                <Text style={styles.texto}>
                    1. Coleta de Dados: Coletamos informações fornecidas por você e dados de uso do aplicativo para melhorar nossos serviços.{'\n'}
                    2. Informações Pessoais: Nome, e-mail e dados de perfil são armazenados com segurança para criar sua conta.{'\n'}
                    3. Localização: Seu acesso à localização é usado apenas com sua permissão para encontrar profissionais próximos a você.{'\n'}
                    4. Uso dos Dados: Utilizamos suas informações para personalizar sua experiência e conectar você aos serviços adequados.{'\n'}
                    5. Compartilhamento: Seus dados nunca são vendidos. Compartilhamos informações apenas com profissionais de saúde escolhidos por você, para agendamento e atendimento.{'\n'}
                    6. Segurança: Adotamos medidas técnicas para proteger seus dados contra acessos não autorizados ou vazamentos.{'\n'}
                </Text>
            </PurpleSquare>
        </Background>
    );
}

const styles = StyleSheet.create({

    titulo: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15
    },

    texto: {
        color: 'white',
        fontSize: 16,
        lineHeight: 22
    },
});