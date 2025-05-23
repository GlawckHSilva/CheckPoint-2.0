import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!loaded) {
    return null; // Aguarda o carregamento das fontes
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot /> {/* Slot carrega a rota ativa (ex: (tabs)/Home, etc) */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
export default RootLayout;
