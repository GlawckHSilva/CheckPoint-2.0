import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',

  },

  login: {
    width: 300,
    height: 300,
    marginBottom: 80,
  },

  title: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
  },

  input: {

    borderWidth: 1,
    borderColor: '#F35C22',
    color: '#fff',
    width: 350 ,
    height: 60,
    padding: 8,
    fontSize: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    
  },

  botao: {
    width: '25%',
    padding: 10,
    backgroundColor: '#F35C22',
    borderRadius: 10,
    color:'#fff',
    alignItems: 'center',
    marginTop: 30,
  }

})