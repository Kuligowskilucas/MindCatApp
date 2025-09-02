
import perfilMock from '@/assets/mocks/perfil.json';
import Background from '@/components/Background';
import PurpleSquare from '@/components/purpleSquare';
import { StyleSheet, Text, View } from "react-native";


export default function Perfil(){

    const perfil = perfilMock.paciente;

    return(

        <Background>
            
            <PurpleSquare style={styles.areaNome}>
                <View>
                    <Text style={styles.nome}>
                        {perfil.nome_completo}
                    </Text>
                </View>
                <View style={styles.risco}></View>
                <View>
                    <Text style={styles.titulo}>
                        Informações Gerais
                    </Text>
                    <Text style={styles.informacao}>
                        {'\u2022'} Idade: {perfil.informacoes_gerais.idade}
                    </Text>
                    <Text style={styles.informacao}>
                        {'\u2022'} Tempo de terapia: {perfil.informacoes_gerais.tempo_de_terapia}
                    </Text>
                    <Text style={styles.informacao}>
                        {'\u2022'} Psicólogo: {perfil.informacoes_gerais.psicologo}
                    </Text>
                </View>
                <View style={styles.risco}></View>
                <View>
                    <Text style={styles.titulo}>
                        Diagnóstico Principal
                    </Text>
                    <Text style={styles.informacao}>
                        {'\u2022'} {perfil.diagnostico_principal.condicao} ({perfil.diagnostico_principal.cid11})
                    </Text>
                    <Text style={styles.informacao}>
                        {'\u2022'} Data do Diagnóstico: {perfil.diagnostico_principal.data_do_diagnostico}
                    </Text>
                    <Text style={styles.informacao}>
                        {'\u2022'} Diagnosticado por: {perfil.diagnostico_principal.diagnosticado_por}
                    </Text>
                </View>
                <View style={styles.risco}></View>
                <Text style={styles.titulo}>
                    Características Clínicas
                </Text>
                <Text style={styles.informacao}>
                    {perfil.resumo_e_caracteristicas_clinicas.resumo} 
                </Text>
                <Text style={styles.informacao}>
                    {'\u2022'} {perfil.resumo_e_caracteristicas_clinicas.sintomas_proeminentes} 
                </Text>
            </PurpleSquare>
        </Background>
    );
}

const styles = StyleSheet.create({
    nome: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    risco: {
        width: '100%',
        height: 2,
        backgroundColor: 'white'
    },
    areaNome: {
        gap: 10
    },
    titulo:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    informacao:{
        color: 'white',
        fontSize: 16,
        lineHeight: 25
    }

})