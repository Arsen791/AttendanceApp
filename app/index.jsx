import { View, Button } from 'react-native';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Go to Welcome" onPress={() => router.push('/signUp')} />
    </View>
  );
};

export default Index;
