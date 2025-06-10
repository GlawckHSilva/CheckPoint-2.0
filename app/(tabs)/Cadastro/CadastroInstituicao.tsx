// ========================
// IMPORTAÇÕES
// ========================
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from '../../../src/styles/StyleCadastro';
import { router } from 'expo-router';
import { db } from '@/src/firebase/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';


// ========================
// COMPONENTE PRINCIPAL
// ========================
function CadastroInstituicao() {
  
  // ------------------------
  // STATES (variáveis do formulário)
  // ------------------------
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [telefone, setTelefone] = useState('');

  
  // ------------------------
  // FUNÇÃO DE CADASTRO
  // ------------------------
  const handleCadastro = async () => {
    if (!nome || !cidade || !rua || !numero || !telefone) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      await addDoc(collection(db, 'Instituicao'), {
        nome,
        cidade,
        rua,
        numero: Number(numero),
        telefone
      });

      Alert.alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao cadastrar instituição. Tente novamente');
    }
  };


  // ------------------------
  // INTERFACE (RETORNO VISUAL)
  // ------------------------
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            
            {/* Botão Voltar */}
            <Icon
              name="arrowleft"
              size={30}
              color="#fff"
              style={{ marginTop: 50, marginLeft: 20 }}
              onPress={router.back}
            />

            {/* Título */}
            <Text style={styles.title}>Cadastro Instituição</Text>

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

            {/* FORMULÁRIO */}
            <View style={styles.formContainer}>
              <TextInput
                placeholder="Nome:                      "
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholderTextColor="#ccc"
              />
              <TextInput
                placeholder="Cidade:"
                style={styles.input}
                value={cidade}
                onChangeText={setCidade}
                placeholderTextColor="#ccc"
              />
              <TextInput
                placeholder="Rua:"
                style={styles.input}
                value={rua}
                onChangeText={setRua}
                placeholderTextColor="#ccc"
              />
              <TextInput
                placeholder="Número:"
                style={styles.input}
                value={numero}
                onChangeText={setNumero}
                keyboardType="numeric"
                placeholderTextColor="#ccc"
              />
              <TextInput
                placeholder="Telefone:"
                style={styles.input}
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
                placeholderTextColor="#ccc"
              />
            </View>

            {/* BOTÃO DE CADASTRO */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Cadastrar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default CadastroInstituicao;
