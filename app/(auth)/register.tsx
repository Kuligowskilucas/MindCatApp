import Background from '@/components/Background';
import AppLogo from '@/components/ui/Logo';
import colors from '@/theme/colors';
import { Link } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput } from 'react-native';

export default function RegisterScreen() {
  return (
    <Background>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <AppLogo/>

        <Text style={styles.title}>
          Muito bom te ter aqui, faça seu cadastro para a gente se conhecer :)
        </Text>

        <TextInput placeholder="E-mail" placeholderTextColor="#888" style={styles.input} keyboardType="email-address" autoCapitalize="none"/>
        <TextInput placeholder="Senha" placeholderTextColor="#888" style={styles.input} secureTextEntry/>
        <TextInput placeholder="Confirmar Senha" placeholderTextColor="#888" style={styles.input} secureTextEntry/>

        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>

        <Text style={styles.link}>
          Já tem cadastro? <Link href={'/login'}> <Text style={styles.linkBold}>Clique aqui</Text></Link>
        </Text>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.secondary, 
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: colors.buttonClicked,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#000',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  linkBold: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});
