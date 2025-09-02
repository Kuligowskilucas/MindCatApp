import Background from '@/components/Background';
import Editor from '@/components/dom-components/hello-dom';
import AppLogo from '@/components/ui/Logo';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';




export default function diary(){

    const [plainText, setPlainText] = useState(""); //aqui eu acesso o texto que esta sendo escrito
    const [editorState, setEditorState] = useState<string | null>(null);

    // console.log(plainText)
    // console.log(editorState)
    return(
        <>
            <Background style={styles.container}>
                <View style={styles.areaTexto}>
                    <AppLogo />
                    <Text style={styles.texto}>
                        Aqui é sua zona segura, apenas você e seus pensamentos
                    </Text>
                </View>
                <Editor setPlainText={setPlainText} setEditorState={setEditorState}/>
            </Background>
        </>
    );

}

const styles = StyleSheet.create({

    container:{
        paddingHorizontal: 0,
        width: '100%',
        height: '100%',
    },

    areaTexto:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        width: '100%',
        paddingTop: 16
    },

    texto:{
        textAlign: 'center'
    },

      buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },

  link: {
    paddingVertical: 12,
    // paddingHorizontal: 24,
    width: 128,
    borderRadius: 50,
    // backgroundColor: 'black',
  }
    
})