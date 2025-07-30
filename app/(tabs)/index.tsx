// app/index.tsx
import Background from '@/components/Background';
import { useRouter } from 'expo-router';
import { Image, StyleSheet } from 'react-native';


export default function HomeScreen() {
  const router = useRouter();

  return (
      <Background style={styles.background}>
        <Image source={require('../../assets/images/homepage/icone.png')} resizeMode='contain' style={styles.image}/>
        <Image source={require('../../assets/images/homepage/assinatura.png')} resizeMode='contain' style={styles.image}/>
      </Background>
  );
}

const styles = StyleSheet.create({

   background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  image: {
    width: 200,
    height: 200,
  },
});
