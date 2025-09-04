import Background from "@/components/Background";
import PurpleSquare from "@/components/purpleSquare";
import WhiteSquare from "@/components/whiteSquare";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Mood = 1| 2 | 3 | 4 | 5;

const icons = [

require('../../assets/images/imagensGrafico/botaoBravo.png'),
require('../../assets/images/imagensGrafico/botaoTriste.png'),
require('../../assets/images/imagensGrafico/botaoNormal.png'),
require('../../assets/images/imagensGrafico/botaoFeliz.png'),
require('../../assets/images/imagensGrafico/botaoMuitoFeliz.png')

] as const;

export default function EmotionGraphic(){

    const [mood, setMood] = useState<Mood | null>(null);

    return(
        <Background>
            <PurpleSquare>
                <Text style={styles.descricao}>
                    Como está seu humor hoje?
                </Text>
                <Text style={styles.descricao}>
                    Pode nos contar sem medo, a escala gatinho vai te ajudar
                </Text>
                <WhiteSquare>
                    <View style={styles.areaGrafico}>
                        {icons.map((img, index) =>{
                            const val = (index + 1) as Mood; // 1..5
                            const selected = mood === val;
                            return(
                                <Pressable key={val} onPress={() => setMood(val)} style={[styles.tamanhoBotao, selected && { opacity: 0.7 }]}>
                                    <Image style={styles.imagemGrafico} source={img} resizeMode='contain'/>
                                </Pressable>
                            )
                        })}
                    </View>
                </WhiteSquare>
                 <Text style={{ color: 'white', marginTop: 8 }}>Humor atual: {mood ?? '—'}</Text>
            </PurpleSquare>
        </Background>
    );
}

const styles = StyleSheet.create({

    descricao:{
        color: 'white',
        fontSize: 16,
        lineHeight: 25,
        textAlign: 'center',
        marginBottom: 24
    },

    areaGrafico: {
        display: 'flex',
        flexDirection: 'row',
    },

    tamanhoBotao: {
        width: '20%',
        height: 60
    },
    imagemGrafico:{
        width: '100%',
        height: '100%'
    }

})