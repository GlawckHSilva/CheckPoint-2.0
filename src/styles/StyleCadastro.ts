import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  // ========================
  // CONTAINER GERAL
  // ========================
  container: {
    flex: 1,
    padding: 20,
  },

  // ========================
  // TÍTULO
  // ========================
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },

  // ========================
  // FORMULÁRIO
  // ========================
  formContainer: {
    alignItems: 'center',
    padding: 20,
  },

  input: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F35C22',
    color: '#fff',
    width: 350,
    height: 60,
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },

  // ========================
  // DROPDOWN PICKER
  // ========================
  pickerContainer: {
    zIndex: 1000,
    width: 350,
    marginBottom: 20,
  },

  dropDownPickerContainer: {
    height: 60,
    width: '100%',
    borderRadius: 10,
  },

  dropDownPickerStyle: {
    color: '#fff',
    borderWidth: 1,
    backgroundColor: '#1D2F40',
    borderColor: '#F35C22',
  },

  dropDownContainer: {
    backgroundColor: '#F35C22',
    borderColor: '#fff',
    borderWidth: 1,
    maxHeight: 200,
  },

  dropDownLabel: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },

  dropDownPlaceholder: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },

  // ========================
  // BOTÃO
  // ========================
  button: {
    width: '35%',
    padding: 15,
    backgroundColor: '#F35C22',
    borderRadius: 10,
    color: '#fff',
    alignItems: 'center',
    marginBottom: 20,
  },
    buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
}

);
