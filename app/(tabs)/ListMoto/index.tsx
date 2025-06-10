import { useRouter } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../../../src/styles/ListaStyle';

const ListaPresenca = ({ motoristaId }: { motoristaId: string }) => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchAlunosPresentes();
  }, []);

  const fetchAlunosPresentes = async () => {
    const db = getFirestore();
    const alunosRef = collection(db, 'Motoristas', motoristaId, 'alunos');
    const snapshot = await getDocs(alunosRef);
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAlunos(lista);
  };

  const removerAluno = (id: string) => {
    Alert.alert(
      'Remover Aluno',
      'Deseja realmente remover esse aluno da lista de presença?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          onPress: async () => {
            const db = getFirestore();
            await deleteDoc(doc(db, 'Motoristas', motoristaId, 'alunos', id));
            setAlunos(alunos.filter(a => a.id !== id));
          },
        },
      ]
    );
  };

  const adicionarAlunoManualmente = () => {
    Alert.prompt('Adicionar Aluno', 'Digite o nome do aluno', async (nome) => {
      if (nome) {
        const db = getFirestore();
        await addDoc(collection(db, 'Motoristas', motoristaId, 'alunos'), {
          nome: nome,
          // Adicione outros campos conforme necessário, ou solicite mais informações do usuário
        });
        fetchAlunosPresentes();
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrowleft" size={24} onPress={() => router.back()} style={styles.icon} />
        <Text style={styles.title}>Alunos no Ônibus</Text>
        <TouchableOpacity onPress={adicionarAlunoManualmente}>
          <Icon name="plus" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={alunos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.alunoItem}>
            <TouchableOpacity style={styles.deleteCircle} onPress={() => removerAluno(item.id)}>
              <Icon name="minus" size={16} style={styles.deleteIcon} />
            </TouchableOpacity>
            <Text style={styles.infoItem}>{item.nome}</Text>
            <Text style={styles.infoItem}>{item.faculdade}</Text>
            <Text style={styles.infoItem}>{item.curso}</Text>
            <Text style={styles.infoItem}>{item.telefone}</Text>
            <QRCode value={item.id} size={100} />
          </View>
        )}
      />
    </View>
  );
};

export default function ListMoto() {
  const [motoristaId, setMotoristaId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setMotoristaId(user?.uid ?? null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF6B2C" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!motoristaId) {
    return <Text>Motorista não autenticado.</Text>;
  }

  return <ListaPresenca motoristaId={motoristaId} />;
}
