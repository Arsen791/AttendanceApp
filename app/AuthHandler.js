import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';


const AuthHandler = () => {
  const { setAuth, setUserData } = useAuth(); // Используем контекст авторизации
  const router = useRouter(); // Управляем навигацией


  useEffect(() => {
	const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
	  console.log('Событие аутентификации:', _event, session);
  
	  if (session) {
		console.log('Есть сессия, перенаправляем на home');
		setAuth(session?.user);
		router.replace('/qrs');
	  } else {
		console.log('Нет сессии, перенаправляем на welcome');
		setAuth(null);
		router.replace('/signUp');
	  }
	});
  
	return () => {
	  console.log('Отписка от событий аутентификации');
	  subscription?.unsubscribe?.();
	};
  }, []);
	  

  // Получение данных пользователя из базы
  const fetchUserData = async (user) => {
    try {
      const { data, error } = await supabase
        .from('students') // Здесь укажи нужную таблицу (students, teachers или parents)
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) throw error;

      setUserData(data); // Сохраняем данные пользователя в контексте
    } catch (error) {
      console.error('Ошибка загрузки данных пользователя:', error.message);
    }
  };

  return null; // Компонент не рендерит ничего
};

export default AuthHandler;
