// ========================
// IMPORTAÇÕES
// ========================
import React, { useEffect, useState } from 'react';
import {
  Alert, Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform, ScrollView,
  Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import { db } from '@/src/firebase/firebaseconfig';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from '../../../src/styles/StyleCadastro';


// ========================
// COMPONENTE PRINCIPAL
// ========================
function CadastroAluno() {

  // ------------------------
  // STATES
  // ------------------------
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [curso, setCurso] = useState('');
  const [faculdadeSelecionada, setFaculdadeSelecionada] = useState('');
  const [faculdades, setFaculdades] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);


  // ------------------------
  // CARREGAR FACULDADES
  // ------------------------
  useEffect(() => {
    const fetchFaculdades = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'Instituicao'));
        const faculdadesList = snapshot.docs.map(doc => doc.data().nome);
        setFaculdades(faculdadesList);
      } catch {
        Alert.alert('Erro', 'Não foi possível carregar as faculdades.');
      }
    };
    fetchFaculdades();
  }, []);


  // ------------------------
  // FUNÇÃO DE CADASTRO
  // ------------------------
  const handlerCadastro = async () => {
    if (!name || !email || !senha || !cpf || !telefone || !curso || !faculdadeSelecionada) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      const auth = getAuth();
      // Cria o usuário no Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

      // Salva os dados no Firestore
      await setDoc(doc(db, 'Alunos', userCredential.user.uid), {
        uid: userCredential.user.uid,
        nome: name,
        email: email,
        senha: senha,
        cpf: cpf.replace(/[^\d]/g, ''),
        telefone: telefone,
        curso: curso,
        faculdade: faculdadeSelecionada,
      });

      Alert.alert('Cadastro realizado com sucesso!');
      router.back();
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Este e-mail já está em uso.');
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar aluno. Tente novamente.');
      }
    }
  };


  // ------------------------
  // INTERFACE
  // ------------------------
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

          <View style={styles.container}>

            {/* Botão de Voltar */}
            <TouchableOpacity onPress={router.back}>
              <IconAntDesign name="arrowleft" size={30} color="#fff" style={{ marginTop: 50, marginLeft: 20 }} />
            </TouchableOpacity>

            {/* Título */}
            <Text style={styles.title}>Cadastro Aluno</Text>

            {/* Imagem */}
            <Image
              source={require('@/assets/image/Cadastro.png')}
              style={{ width: 200, height: 200, marginTop: 20, alignSelf: 'center' }}
            />

            {/* Formulário */}
            <View style={styles.formContainer}>
              <TextInput
                placeholder="Nome:"
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholderTextColor="#ccc"
              />

              <TextInput
                placeholder="Email:"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#ccc"
              />
              <View style={[styles.input, { flexDirection: 'row', alignItems: 'center' }]}>
                <TextInput
                  style={{ flex: 1, color: '#fff' }}
                  placeholder="Senha"
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!mostrarSenha}
                  placeholderTextColor="#ccc"
                />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                  <Icon
                  name={mostrarSenha ? "eye" : "eye-off"}
                  size={22}
                  color="#FF6B2C"
                  style={{ marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </View>

              <TextInput
                placeholder="CPF:"
                style={styles.input}
                value={cpf}
                onChangeText={setCpf}
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

              <TextInput
                placeholder="Curso:"
                style={styles.input}
                value={curso}
                onChangeText={setCurso}
                placeholderTextColor="#ccc"
              />

              {/* Dropdown de Faculdade */}
              <View style={styles.pickerContainer}>
                <DropDownPicker
                  open={open}
                  value={faculdadeSelecionada}
                  items={faculdades.map(faculdade => ({
                    label: faculdade,
                    value: faculdade,
                  }))}
                  setOpen={setOpen}
                  setValue={setFaculdadeSelecionada}
                  setItems={() => {}} // Desnecessário neste caso
                  placeholder="Faculdade:"
                  containerStyle={styles.dropDownPickerContainer}
                  style={styles.dropDownPickerStyle}
                  dropDownContainerStyle={styles.dropDownContainer}
                  labelStyle={styles.dropDownLabel}
                  placeholderStyle={styles.dropDownPlaceholder}
                  textStyle={styles.dropDownLabel}
                  listMode="SCROLLVIEW"
                  theme="DARK"
                />
              </View>
            </View>

            {/* Botão de Cadastrar */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <TouchableOpacity style={styles.button} onPress={handlerCadastro}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 }}>Cadastrar</Text>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default CadastroAluno;
