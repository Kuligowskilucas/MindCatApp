import Background from "@/components/Background";
import PurpleSquare from "@/components/purpleSquare";
import { StyleSheet, Text } from 'react-native';

export default function Sobre(){
    return(
        <Background>
            <PurpleSquare>
                <Text style={styles.titulo}>
                    Sobre Nós
                </Text>
                <Text style={styles.texto}>
                    Bem-vindo ao nosso aplicativo. Nossa jornada começou com uma missão simples: tornar o cuidado com a saúde mental mais acessível, humano e eficiente para todos. Acreditamos que buscar apoio psicológico não precisa ser um processo complicado ou intimidante.{'\n'}
                    Somos uma equipe diversa, composta por desenvolvedores, designers e profissionais de saúde mental, unidos pelo mesmo propósito. Combinamos tecnologia moderna com um entendimento profundo das necessidades humanas para criar uma ponte que conecta quem precisa de ajuda a profissionais qualificados de forma rápida e segura.{'\n'}
                    Nosso valor principal é você. Colocamos a privacidade, o bem-estar e a satisfação dos nossos usuários em primeiro lugar em todas as decisões que tomamos. Estamos constantemente evoluindo e melhorando nossa plataforma com base no feedback daqueles que confiam em nosso serviço.{'\n'}
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