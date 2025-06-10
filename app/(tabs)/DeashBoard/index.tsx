import { Link, useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from "../../../src/styles/StyleDeash";

function DeashBoard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.replace('/(tabs)/Home'); 
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <View style={styles.container} >
      {/* Botão de logout no canto superior esquerdo */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 40,
          left: 20,
          zIndex: 10,
          backgroundColor: 'transparent',
          padding: 8,
        }}
        onPress={handleLogout}
      >
        <Icon name="log-out" size={28} color="#FF6B2C" />
      </TouchableOpacity>

      <Text style={styles.title}> Bem vindo(a) Nome da pessoa</Text>

      <View style={styles.button}>
        <Link href="/(tabs)/Lista/ListaInstituicao" asChild>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.text}>Instituição</Text>
            <Image source={require('@/assets/image/Instituicao.png')} />
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/Lista/ListaMotorista" asChild>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.text}>Motorista</Text>
            <Image source={require('@/assets/image/Motorista.png')} />
          </TouchableOpacity>
        </Link>

        <Link href="/(tabs)/Lista/ListaAluno" asChild>
          <TouchableOpacity style={styles.box}>
            <Text style={styles.text}>Aluno</Text>
            <Image source={require('@/assets/image/Alunos.png')} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default DeashBoard;