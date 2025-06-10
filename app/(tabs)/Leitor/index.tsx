import { db } from '@/src/firebase/firebaseconfig';
import { Camera, CameraView } from 'expo-camera';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Animated, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

function LeitorQR() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [checkScale] = useState(new Animated.Value(0));

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    const motoristaId = data;

    Alert.alert(
      'Confirmação',
      'Você deseja marcar sua presença como:',
      [
        {
          text: 'Embarcar',
          onPress: () => registrarPresenca(motoristaId, 'entrada'),
        },
        {
          text: 'Desembarcar',
          onPress: () => registrarPresenca(motoristaId, 'saida'),
        },
      ],
      { cancelable: false }
    );
  };

  const registrarPresenca = async (motoristaId: string, tipo: 'entrada' | 'saida') => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        setScanned(false);
        return;
      }

      const alunoRef = doc(db, 'Alunos', user.uid);
      const alunoSnap = await getDoc(alunoRef);

      if (!alunoSnap.exists()) {
        Alert.alert('Erro', 'Dados do aluno não encontrados.');
        setScanned(false);
        return;
      }

      const alunoData = alunoSnap.data();

      await addDoc(collection(db, 'Motoristas', motoristaId, 'alunos'), {
        nome: alunoData.nome,
        faculdade: alunoData.faculdade,
        curso: alunoData.curso,
        telefone: alunoData.telefone,
        uid: alunoData.uid,
        dataHora: new Date().toISOString(),
      });

      // Mostra o check animado
      setShowCheck(true);
      Animated.spring(checkScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(checkScale, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setShowCheck(false));
        }, 1200);
      });

      // Alert opcional
      // Alert.alert('Sucesso', `Presença registrada como "${tipo}".`);
    } catch (error) {
      console.error('Erro ao registrar presença:', error);
      Alert.alert('Erro', 'Não foi possível registrar a presença.');
    } finally {
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão da câmera...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Sem acesso à câmera.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      />

      {/* Animação de check */}
      {showCheck && (
        <View style={styles.overlay}>
          <Animated.View style={[
            styles.checkCircle,
            { transform: [{ scale: checkScale }] }
          ]}>
            <Icon name="check" size={64} color="#FF6B2C" />
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#FF6B2C',
    shadowColor: '#FF6B2C',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default LeitorQR;
