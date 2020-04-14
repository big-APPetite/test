import React, {Component} from 'react';
import {
  StyleSheet,
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
    .email('Enter a valid email')
    .required('Please enter a registered email'),
});

function resetPassword(values, navigation) {
  Firebase.auth()
    .sendPasswordResetEmail(values.email)
    .then(() => navigation.navigate('Login'))
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        alert('Email address is not valid');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}

export default class ForgotPassword extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.container}>
          <Text style={styles.text}>Enter your email</Text>
          <Formik
            initialValues={{email: ''}}
            onSubmit={(values, {setSubmitting}) => {
              resetPassword(values, this.props.navigation);
              setSubmitting(false);
            }}
            validationSchema={validationSchema}>
            {formikProps => (
              <React.Fragment>
                <StyledInput
                  label="Email"
                  formikProps={formikProps}
                  formikKey="email"
                  placeholder="Please enter your email"
                />

                {formikProps.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <TouchableOpacity
                    style={globalStyles.buttonSubmit}
                    onPress={formikProps.handleSubmit}>
                    <Text style={globalStyles.buttonText}>SUBMIT</Text>
                  </TouchableOpacity>
                )}
              </React.Fragment>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    paddingBottom: 5,
  },
});
