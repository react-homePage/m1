import React from 'react';
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {View, Button, Text, TextInput, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {userRegistration} from '../store/reducer/slice';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
});

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onPressSend = formData => {
    // Perform actions with the validated form data
    console.log('formData', formData);
    dispatch(userRegistration(formData));
    reset();
    navigation.navigate('login', {formData});
  };

  return (
    <View>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholderTextColor="black"
              value={value}
              onChangeText={onChange}
              placeholder="Email"
              style={styles.textBox}
            />
          )}
          name="email"
        />
        {errors.email && <Text>{errors.email.message}</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholderTextColor="black"
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              secureTextEntry
              style={styles.textBox}
            />
          )}
          name="password"
        />
        {errors.password && <Text>{errors.password.message}</Text>}
      </View>
      <Button title="Submit" onPress={handleSubmit(onPressSend)} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  textBox: {
    borderWidth: 2,
    borderColor: 'black',
    height: 40,
    width: 300,
    alignSelf: 'center',

    color: 'black',
  },
});
