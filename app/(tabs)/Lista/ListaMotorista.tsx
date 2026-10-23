// ListaMotorista.tsx
import { useRouter } from 'expo-router';
import { db } from '@/src/firebase/firebaseconfig';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import styles from '../../../src/styles/ListaStyle'; // Importando os estilos


const ListaMotorista: React.FC = () => {
  const [motoristas, setMotoristas] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchMotoristas = async () => {
      const motoristasCollection = collection(db, 'Motoristas');
      const motoristasSnapshot = await getDocs(motoristasCollection);
      const motoristasList = motoristasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMotoristas(motoristasList);
    };

    fetchMotoristas();
  }, []);

  const handleDelete = async (id: string) => {
    Alert.alert(
      "Excluir Motorista",
      "Deseja excluir este motorista?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            await deleteDoc(doc(db, 'Motoristas', id));
            setMotoristas(motoristas.filter(motorista => motorista.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const filteredMotoristas = motoristas.filter(motorista =>
    (motorista.nome || '').toLowerCase().includes((search || '').toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrowleft" size={24} onPress={() => router.back()} style={styles.icon} />
        <Text style={styles.title}>Lista de Motoristas</Text>
        <View style={styles.iconContainer}>
          <Icon name="search1" size={24} onPress={() => setShowSearch(!showSearch)} style={styles.icon} />
          <Icon name="plus" size={24} onPress={() => router.push('/(tabs)/Cadastro/CadastroMotorista')} style={styles.icon} />
        </View>
      </View>

      {showSearch && (
        <TextInput
          style={[styles.searchInput, { marginBottom: 20 }]}
          placeholder="Pesquisar motorista..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      )}

      <FlatList
        style={{ marginTop: 20 }}
        data={filteredMotoristas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alunoItem}>
            {/* Ícone de menos no círculo vermelho à esquerda */}
            <TouchableOpacity
              style={styles.deleteCircle}
              onPress={() => handleDelete(item.id)}
            >
              <Icon name="minus" size={16} style={styles.deleteIcon} />
            </TouchableOpacity>

            {/* Informações roláveis */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.alunoInfoScroll}>
              <View style={styles.alunoInfoText}>
                {[{ label: 'Nome', value: item.nome },
                  { label: 'CPF', value: item.cpf || item.CPF },
                  { label: 'Email', value: item.email },
                  { label: 'Telefone', value: item.telefone },                ].map((info, index, array) => (
                  <View key={index} style={styles.infoItemContainer}>
                    <Text style={styles.infoItem}>{info.label}: {info.value}</Text>
                    {/* Adiciona a linha vertical apenas entre os itens, não depois do último */}
                    {index < array.length - 1 && <View style={styles.verticalDivider} />}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      />
    </View>
  );
};

export default ListaMotorista;
