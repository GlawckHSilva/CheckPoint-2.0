import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import React, { useRef } from 'react';
import { Alert, Button, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../../../src/styles/QR';

const QRCodeMotorista: React.FC = () => {
  const { id: motoristaId } = useLocalSearchParams() as { id: string };
  const qrRef = useRef<any>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.replace('/(tabs)/DeashBoard'); // Redireciona para a tela de dashboard após logout
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const salvarQRCode = async () => {
    if (qrRef.current) {
      qrRef.current.toDataURL(async (data: string) => {
        try {
          const fileUri = FileSystem.cacheDirectory + `qr-motorista-${motoristaId}.png`;
          await FileSystem.writeAsStringAsync(fileUri, data, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const { status } = await MediaLibrary.requestPermissionsAsync();
          if (status === 'granted') {
            await MediaLibrary.saveToLibraryAsync(fileUri);
            Alert.alert('Sucesso', 'QR Code salvo na galeria!');
          } else {
            Alert.alert('Erro', 'Permissão para salvar imagens negada.');
          }
        } catch (error) {
          console.error('Erro ao salvar QR Code:', error);
          Alert.alert('Erro', 'Não foi possível salvar o QR Code.');
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão de logout */}
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
      <Text style={styles.title}>QR Code do Motorista</Text>
      <QRCode
        value={motoristaId}
        size={250}
        getRef={(ref) => (qrRef.current = ref)}
      />
      <View style={styles.botao}>
        <Button title="Baixar QR Code em PNG" onPress={salvarQRCode} />
      </View>
    </View>
  );
};

export default QRCodeMotorista;
