import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'flex-start', // alinha no topo
  alignItems: 'center',
  backgroundColor: '#1D2F40',
  paddingTop: 40, // ajusta esse valor como quiser
},
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
},
  subtitle: {
    fontSize: 25,
    marginBottom: 50,
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Poppins-Bold',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkStudent: {
    fontSize: 23,
    color: '#fff',
    marginBottom: 10,
    backgroundColor: '#F35C22',
    padding: 8,
    borderRadius: 10,
    fontFamily: 'Poppin-Regular'
  },
  link: {
    fontSize: 23,
    color: '#F35C22',
    marginBottom: 2,
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    borderColor: '#F35C22',
    fontFamily: 'Poppin-Regular'
  },

  buttomTop: {
    marginBottom: 10,         // Dá um espaçamento de 30 abaixo do botão, separando ele dos botões de baixo
    width: '60%',             // O botão vai ocupar 60% da largura da tela/pai
    alignItems: 'center',     // Centraliza o conteúdo dentro do botão (ex: texto)
  },

  buttomButtom: {
    flexDirection: 'row',           // Coloca os itens (botões) em linha horizontal
    justifyContent: 'space-between', // Distribui o espaço igualmente entre os botões
    gap: 10,                         // Espaço entre os botões (funciona em React Native 0.71+ e Expo SDK 49+)
  },


});


