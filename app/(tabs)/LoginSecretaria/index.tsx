import { auth } from "@/src/firebase/firebaseconfig";
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from "../../../src/styles/StyleAluno";

function LoginSecretaria() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
  });

  const validateEmail = (value: string) => {
    setEmail(value);
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      setEmailError('Email inválido.');
    } else {
      setEmailError('');
    }
  };

  const validateSenha = (value: string) => {
    setSenha(value);
    if (value.length < 4) {
      setSenhaError('Senha deve ter pelo menos 4 caracteres');
    } else {
      setSenhaError('');
    }
  };

  const handleLogin = async () => {
    if (emailError || senhaError || !email || !senha) {
      Alert.alert("Erro", "Verifique os campos antes de continuar.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push("/(tabs)/DeashBoard");
    } catch (error: any) {
      console.log("Erro no login:", error.message || error);
      Alert.alert("Erro", "Email ou senha incorretos.");
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando fontes...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, marginLeft: 20 }}>
              <Icon name="arrowleft" size={25} color="#F35C22" onPress={router.back} style={{ marginRight: 25 }} />
              <Text style={styles.title}>Login Secretaria</Text>
            </View>

            <Image source={require('@/assets/image/Login.png')} style={styles.login} />

            {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={validateEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#fff"
            />

            {senhaError ? <Text style={{ color: 'red' }}>{senhaError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry={true}
              onChangeText={validateSenha}
              value={senha}
              placeholderTextColor="#fff"
            />

            <TouchableOpacity
              style={styles.botao}
              onPress={handleLogin}
              disabled={!!emailError || !!senhaError || !email || !senha}
            >
              <Text style={{ color: '#fff', fontSize: 20 }}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default LoginSecretaria;
