import React, {Component} from 'react';
import {
  TextInput,
  ActivityIndicator,
  Text,
  View,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {globalStyles} from './styles/global';
import Firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const FieldWrapper = ({children, label, formikProps, formikKey}) => (
  <View>
    <Text style={{marginBottom: 3, color: 'white'}}>{label}</Text>
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

const StyledSwitch = ({formikKey, formikProps, label, ...rest}) => (
  <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .label('Username')
    .required(),
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(2)
    .max(10),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    }),
  agreeToTerms: yup
    .boolean()
    .label('Terms')
    .test(
      'is-true',
      'Must agree to terms to continue',
      value => value === true,
    ),
});

function signUp(values) {
  Firebase.auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(res => {
      Firebase.database()
        .ref('users/' + res.user.uid)
        .set({
          uid: res.user.uid,
          username: values.username,
          email: values.email,
        });
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  console.log(values);
}

export default class Signup extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.container}>
          <View>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                agreeToTerms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, {setSubmitting}) => {
                signUp(values, this.props.navigation);
                setSubmitting(false);
              }}>
              {formikProps => (
                <React.Fragment>
                  <StyledInput
                    label="Username"
                    formikProps={formikProps}
                    formikKey="username"
                    placeholder="Please enter a username"
                  />

                  <StyledInput
                    label="Email"
                    formikProps={formikProps}
                    formikKey="email"
                    placeholder="Please enter your email"
                  />

                  <StyledInput
                    label="Password"
                    formikProps={formikProps}
                    formikKey="password"
                    placeholder="Please enter a password"
                    secureTextEntry
                  />

                  <StyledInput
                    label="Confirm Password"
                    formikProps={formikProps}
                    formikKey="confirmPassword"
                    placeholder="Please confirm password"
                    secureTextEntry
                  />

                  <StyledSwitch
                    label="Agree to Terms"
                    formikKey="agreeToTerms"
                    formikProps={formikProps}
                  />
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator />
                  ) : (
                    <React.Fragment>
                      <TouchableOpacity
                        style={globalStyles.buttonRegister}
                        onPress={formikProps.handleSubmit}>
                        <Text style={globalStyles.buttonText}>REGISTER</Text>
                      </TouchableOpacity>

                      <Text style={{color: 'red'}}>
                        {formikProps.errors.general}
                      </Text>
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
