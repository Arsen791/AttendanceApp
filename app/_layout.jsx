import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import AuthHandler from './AuthHandler';

const _layout = () => {
  return (
    <AuthProvider>
      <AuthHandler /> {/* Обрабатываем авторизацию */}
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(main)/postDetails" options={{ presentation: 'modal' }} />
    </Stack>
  );
};

export default _layout;
