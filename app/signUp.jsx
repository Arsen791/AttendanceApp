import {Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import Icon from '../assets/icons';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { hp, wp } from '../helpers/common';
import Input from '../components/input';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const [role, setRole] = useState('student'); // Дефолтная роль - студент
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if(!emailRef.current || !passwordRef.current){
      Alert.alert('Sign Up', "Please fill all the fields!");
      return;
    }
    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const { data: { session }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,  // Добавляем роль в метаданные пользователя
        },
      },
    });
    setLoading(false);

    if (error) {
      Alert.alert('Sign Up', error.message);
    } else {
      console.log('session', session);
      console.log('role', role);  // Проверяем роль
    }
  }

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />
        
        {/* welcome */}
        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please fill the details to create an account
          </Text>
          <Input icon={<Icon name="user" size={26} strokeWidth={1.6} />} 
            placeholder="Enter your name"
            onChangeText={value => nameRef.current = value}
          />
          <Input icon={<Icon name="mail" size={26} strokeWidth={1.6} />} 
            placeholder="Enter your email"
            onChangeText={value => emailRef.current = value}
          />
          <Input icon={<Icon name="lock" size={26} strokeWidth={1.6} />} 
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={value => passwordRef.current = value}
          />
          
          {/* Role selection */}
          <View style={styles.roleContainer}>
            <Text style={{ fontSize: hp(1.6), color: theme.colors.text }}>Select your role</Text>
            <Pressable style={styles.roleButton} onPress={() => setRole('student')}>
              <Text style={role === 'student' ? styles.activeRole : styles.inactiveRole}>Student</Text>
            </Pressable>
            <Pressable style={styles.roleButton} onPress={() => setRole('teacher')}>
              <Text style={role === 'teacher' ? styles.activeRole : styles.inactiveRole}>Teacher</Text>
            </Pressable>
            <Pressable style={styles.roleButton} onPress={() => setRole('parent')}>
              <Text style={role === 'parent' ? styles.activeRole : styles.inactiveRole}>Parent</Text>
            </Pressable>
          </View>
          
          <Button title={'Sign Up'} loading={loading} onPress={onSubmit} />
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account! 
          </Text>
          <Pressable onPress={() => router.push('login')}>
            <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  roleContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  roleButton: {
    padding: 10,
    backgroundColor: theme.colors.primaryLight,
    borderRadius: 5,
  },
  activeRole: {
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
  },
  inactiveRole: {
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
