import React, {useEffect} from 'react';
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {View, Button, Text, TextInput, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from '../store/reducer/slice';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
});

const LoginScreen = ({navigation, route}) => {
  const userDetails = useSelector(state => state.movieData.registeruser);
  const dispatch = useDispatch();
  console.log('user detsils', userDetails);
  const {formData} = route?.params;
  console.log('data', formData);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  useEffect(() => {
    setValue('email', formData.email);
    setValue('password', formData.password);
  }, []);
  const onPressSend = formData => {
    // Perform actions with the validated form data
    const result = userDetails.some(
      item =>
        item.email === formData.email && item.password === formData.password,
    );

    if (result) {
      const tokenValue = Date.now();
      console.log('token value', tokenValue);
      dispatch(auth(tokenValue));
    } else {
      alert('invalid credentials ');
    }
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
              value={value}
              placeholderTextColor="black"
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

export default LoginScreen;

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
