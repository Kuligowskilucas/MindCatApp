import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../../theme/colors';

import Background from '@/components/Background';
import { Link } from 'expo-router';

export default function professionalPacient() {
  return (
    <Background style={styles.container}>
      <Image source={require('../../assets/images/homepage/icone.png')} resizeMode='contain' style={styles.image}/>
      <Text style={styles.text}>
        Primeiramente precisamos saber se você é um profissional ou um paciente
      </Text>
      
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Link style={styles.link} href="../(tabs)/diary">
          <Text style={styles.buttonText}>Profissional</Text>
        </Link>
      </Pressable>
      
      <Pressable style={({ pressed }) => [styles.button_2, pressed && styles.buttonPressed]}>
        <Link style={styles.link} href="/register">
          <Text style={styles.buttonText}>Paciente</Text>
        </Link>
      </Pressable>
    </Background>
  );
}

const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    marginTop: 12,
  },
  button_2: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 50,
    marginTop: 12,
  },
  buttonPressed: {
    backgroundColor: colors.buttonClicked,
    borderColor: colors.buttonClicked,
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
});
