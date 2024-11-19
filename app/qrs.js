import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import QRCode from 'react-qr-code';  
import { useRouter } from 'expo-router'; 

const QRCodeScreen = () => {
  const [qrCode, setQRCode] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    const loadQRCode = async () => {
      const qr = '2a27e7a5-ae7c-45d2-8dae-6aa1eae0ec8f'; 
      setQRCode(qr);
    };
    loadQRCode();
  }, []);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      {qrCode ? (
        <QRCode value={qrCode} size={200} />  
      ) : (
        <Text>Загрузка QR-кода...</Text>  
      )}

  
      <Button 
        title="Перейти к сканеру" 
        onPress={() => router.push('/scanner')} 
      />
    </View>
  );
};

export default QRCodeScreen;
