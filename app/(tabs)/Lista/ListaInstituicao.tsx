// ListaInstituicao.tsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/src/firebase/firebaseconfig';
import Icon from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from '../../../src/styles/ListaStyle'; // Importando os estilos


const ListaInstituicao: React.FC = () => {
  const [instituicoes, setInstituicoes] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchInstituicoes = async () => {
      const instituicoesCollection = collection(db, 'Instituicao');
      const instituicoesSnapshot = await getDocs(instituicoesCollection);
      const instituicoesList = instituicoesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInstituicoes(instituicoesList);
    };

    fetchInstituicoes();
  }, []);

  const handleDelete = async (id: string) => {
    Alert.alert(
      "Excluir Instituição",
      "Deseja excluir esta instituição?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            await deleteDoc(doc(db, 'Instituicao', id));
            setInstituicoes(instituicoes.filter(instituicao => instituicao.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const filteredInstituicoes = instituicoes.filter(instituicao =>
    (instituicao.nome || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrowleft" size={24} onPress={() => router.back()} style={styles.icon} />
        <Text style={styles.title}>Lista de Instituições</Text>
        <View style={styles.iconContainer}>
          <Icon name="search1" size={24} onPress={() => setShowSearch(!showSearch)} style={styles.icon} />
          <Icon name="plus" size={24} onPress={() => router.push('/(tabs)/Cadastro/CadastroInstituicao')} style={styles.icon} />
        </View>
      </View>

      {showSearch && (
        <TextInput
          style={[styles.searchInput, { marginBottom: 20 }]}
          placeholder="Pesquisar instituição..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      )}

      <FlatList
        style={{ marginTop: 20 }}
        data={filteredInstituicoes}
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
                  { label: 'Cidade', value: item.cidade },
                  { label: 'Rua', value: item.rua },
                  { label: 'Número', value: item.numero },
                  { label: 'Telefone', value: item.telefone },
                ].map((info, index, array) => (
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

export default ListaInstituicao;
