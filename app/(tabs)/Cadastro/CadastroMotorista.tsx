import { useRouter } from 'expo-router';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Para o ícone de olho
import { styles } from '../../../src/styles/StyleCadastro';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBfo7g9S1vkz7RKuLT5aG4GRBRSSF6V61w",
  authDomain: "chekpoint-glabio.firebaseapp.com",
  projectId: "chekpoint-glabio",
  storageBucket: "chekpoint-glabio.appspot.com",
  messagingSenderId: "817649622341",
  appId: "1:817649622341:web:3a63c3f4424f553957722c"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export default function CadastroMotorista() {
  const [nome, setNome] = useState('');
  const [CPF, setCPF] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const router = useRouter();

  const cadastrarMotorista = async () => {
    if (!nome || !telefone || !CPF || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const auth = getAuth();
      // Cria o motorista no Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

      // Salva os dados no Firestore
      await setDoc(doc(db, 'Motoristas', userCredential.user.uid), {
        uid: userCredential.user.uid,
        nome,
        email,
        telefone,
        CPF,
        senha, // <-- adiciona aqui, se realmente precisar
        alunos: []
      });

      Alert.alert('Sucesso', 'Motorista cadastrado com sucesso!');
      router.push({
        pathname: '/(tabs)/QRCodeMotorista',
        params: { id: userCredential.user.uid },
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Já existe um motorista com esse telefone.');
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar o motorista.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        {/* Seta de voltar fixa no canto superior esquerdo */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 40,
            left: 20,
            zIndex: 10,
            backgroundColor: 'transparent',
            padding: 8,
          }}
          onPress={router.back}
        >
          <Icon name="arrow-left" size={30} color="#FF6B2C" />
        </TouchableOpacity>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[styles.container, { alignItems: 'center', paddingTop: 60 }]}>
              <Text style={[styles.title, { marginTop: 0 }]}>Cadastro Motorista</Text>
              
              {/* Imagem */}
              <Image
                source={require('@/assets/image/Cadastro.png')}
                style={{
                  width: 200,
                  height: 200,
                  marginTop: 20,
                  alignSelf: 'center'
                }}
              />

              {/* Nome */}
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
              />

              {/* CPF */}
              <TextInput
                style={styles.input}
                placeholder="CPF"
                value={CPF}
                onChangeText={setCPF}
                keyboardType="numeric"
              />

              {/* Telefone */}
              <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
              />

              {/* E-mail */}
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              {/* Senha */}
              <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
                <TextInput
                  style={{ flex: 1, color: '#ccc' }}
                  placeholder="Senha"
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                  <Icon name={mostrarSenha ? "eye" : "eye-off"} size={20} color="#FF6B2C" />
                </TouchableOpacity>
              </View>

              {/* Botão */}
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity style={styles.button} onPress={cadastrarMotorista}>
                  <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Cadastrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
}
