import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {globalStyles} from './styles/global';
import Firebase from 'firebase';
import 'firebase/auth';

const FieldWrapper = ({children, formikProps, formikKey}) => (
  <View>
    {children}
    <Text style={{color: 'red', fontWeight: 'bold'}}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const StyledInput = ({label, formikProps, formikKey, ...rest}) => {
  const inputStyles = {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
    color: 'black',
    paddingHorizontal: 10,
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: yup
    .string()
    .label('Password')
    .required(),
});

async function signIn(values) {
  Firebase.auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  console.log('User successfully logged in');
}

export default class Login extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.container}>
          <View style={globalStyles.logoContainer}>
            <Image
              style={globalStyles.logo}
              source={require('../components/images/burger.png')}
            />
            <Text style={globalStyles.logoTagLine}>An app for leftovers.</Text>
          </View>
          <View>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                signIn(values, this.props.navigation);
                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 1000);
              }}>
              {formikProps => (
                <React.Fragment>
                  <StyledInput
                    formikProps={formikProps}
                    formikKey="email"
                    placeholder="Email"
                  />
                  <StyledInput
                    formikProps={formikProps}
                    formikKey="password"
                    placeholder="Password"
                    secureTextEntry
                  />
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator />
                  ) : (
                    <React.Fragment>
                      <TouchableOpacity
                        style={globalStyles.buttonLogin}
                        onPress={formikProps.handleSubmit}>
                        <Text style={globalStyles.buttonText}>LOGIN</Text>
                      </TouchableOpacity>

                      <Text style={{color: 'red'}}>
                        {formikProps.errors.general}
                      </Text>

                      <TouchableOpacity
                        style={globalStyles.buttonRegister}
                        onPress={() =>
                          this.props.navigation.navigate('Signup')
                        }>
                        <Text style={globalStyles.buttonText}>NEW USER?</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.forgotPassword}
                        onPress={() =>
                          this.props.navigation.navigate('ForgotPassword')
                        }>
                        <Text style={{color: 'white'}}>Forgot password?</Text>
                      </TouchableOpacity>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </Formik>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  forgotPassword: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
