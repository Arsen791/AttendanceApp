import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseAnonKey } from '../constants/supabaseClient';


export const supabase = createClient(supabaseUrl, supabaseAnonKey,  {
	auth: {
	  storage: AsyncStorage, // Хранение токенов авторизации в AsyncStorage
	  autoRefreshToken: true, // Автоматическое обновление токенов
	  persistSession: true, // Сессия сохраняется между перезапусками приложения
	  detectSessionInUrl: false, // Не анализировать URL для поиска сессии
	},
  });

AppState.addEventListener('change', (state) => {
	if (state === 'active') {
	  supabase.auth.startAutoRefresh(); // Начинает автообновление токена
	} else {
	  supabase.auth.stopAutoRefresh(); // Останавливает автообновление
	}
});
  