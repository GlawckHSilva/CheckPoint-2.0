import { useRouter } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../../../src/styles/ListaStyle';

interface Aluno {
  id: string;
  nome: string;
  curso?: string;
  faculdade?: string;
  telefone?: string;
}

interface ModalPesquisaAlunoProps {
  visible: boolean;
  onClose: () => void;
  onAdicionar: () => void;
  motoristaId: string;
}

const ModalPesquisaAluno: React.FC<ModalPesquisaAlunoProps> = ({ visible, onClose, onAdicionar, motoristaId }) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    if (visible) {
      const fetchAlunos = async () => {
        const db = getFirestore();
        const snapshot = await getDocs(collection(db, 'Alunos'));
        const lista = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            nome: data.nome || '',
            curso: data.curso || '',
            faculdade: data.faculdade || '',
            telefone: data.telefone || '',
          };
        });
        setAlunos(lista);
      };
      fetchAlunos();
    }
  }, [visible]);

  const alunosFiltrados = alunos.filter(aluno =>
    (aluno.nome || '').toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: '#000a', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: '#222', borderRadius: 10, padding: 20, width: '90%' }}>
          <TextInput
            placeholder="Pesquisar aluno pelo nome"
            placeholderTextColor="#ccc"
            style={{ backgroundColor: '#333', color: '#fff', borderRadius: 8, padding: 10, marginBottom: 16 }}
            value={pesquisa}
            onChangeText={setPesquisa}
          />
          <FlatList
            data={alunosFiltrados}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={async () => {
                  // Adiciona o aluno à lista do motorista
                  const db = getFirestore();
                  await addDoc(collection(db, 'Motoristas', motoristaId, 'alunos'), {
                    nome: item.nome || '',
                    curso: item.curso || '',
                    faculdade: item.faculdade || '',
                    telefone: item.telefone || '',
                  });
                  onAdicionar();
                  onClose();
                }}
              >
                <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#444' }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.nome}</Text>
                  <Text style={{ color: '#fff' }}>Curso: {item.curso || ''}</Text>
                  <Text style={{ color: '#fff' }}>Faculdade: {item.faculdade || ''}</Text>
                  <Text style={{ color: '#fff' }}>Telefone: {item.telefone || ''}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={{ marginTop: 16, alignSelf: 'center' }}>
            <Text style={{ color: '#FF6B2C', fontWeight: 'bold' }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

interface Aluno {
  id: string;
  nome: string;
  // adicione outros campos se necessário
}

const ListaPresenca = ({ motoristaId }: { motoristaId: string }) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchAlunosPresentes();
  }, []);

  const fetchAlunosPresentes = async () => {
      const db = getFirestore();
      const alunosRef = collection(db, 'Motoristas', motoristaId, 'alunos');
      const snapshot = await getDocs(alunosRef);
      const lista = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          nome: data.nome || '',
          curso: data.curso || '',
          faculdade: data.faculdade || '',
          telefone: data.telefone || '',
        };
      });
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

  return (
    <View style={styles.container}>
      <ModalPesquisaAluno
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdicionar={fetchAlunosPresentes}
        motoristaId={motoristaId}
      />
      <View style={styles.header}>
        <Icon name="arrowleft" size={24} onPress={() => router.back()} style={styles.icon} />
        <Text style={styles.title}>Alunos no Ônibus</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.infoItem}>{item.nome}</Text>
                <Text style={styles.infoItem}>Curso: {item.curso}</Text>
                <Text style={styles.infoItem}>Faculdade: {item.faculdade}</Text>
                <Text style={styles.infoItem}>Telefone: {item.telefone}</Text>
                {/* ...outras infos se quiser */}
              </View>
            </ScrollView>
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
