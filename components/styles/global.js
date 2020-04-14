import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#2bb76e',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 20,
    color: 'black',
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 1,
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  buttonRegister: {
    backgroundColor: '#2B2EB7',
    paddingVertical: 10,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoTagLine: {
    marginTop: -20,
    textAlign: 'center',
    color: '#FFF',
  },
  buttonLogin: {
    backgroundColor: '#2B74B7',
    paddingVertical: 10,
  },
  formContainer: {
    flex: 2,
  },
  buttonSubmit: {
    backgroundColor: '#2B2EB7',
    paddingVertical: 10,
  },
});
