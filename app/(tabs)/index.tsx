// app/index.tsx
import Background from '@/components/Background';
import AppLogo from '@/components/ui/Logo';
import { useRouter } from 'expo-router';
import { Image, StyleSheet } from 'react-native';


export default function HomeScreen() {
  const router = useRouter();

  return (
      <Background center>
        <AppLogo style={{width: 200, height: 200}} />
        <Image source={require('../../assets/images/homepage/assinatura.png')} resizeMode='contain' style={styles.image}/>
      </Background>
  );
}

const styles = StyleSheet.create({

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
