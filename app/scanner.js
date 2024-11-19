import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { CameraView, Camera } from "expo-camera";

const QR = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    const handleBarcodeScanned = ({ type, data }) => {
        console.log(`Scanned: ${data}`); // Логируем каждый вызов обработчика
        if (scanned) return; // Прекращаем обработку, если уже сканируем

        setScanned(true); // Блокируем повторное сканирование
        const cleanedData = data.replace(/\s+/g, ""); // Убираем лишние символы
        Alert.alert(
            "QR-код отсканирован",
            `Тип: ${type}, Данные: ${cleanedData}`,
            [
                {
                    text: "OK",
                    onPress: () => {
                        setTimeout(() => setScanned(false), 10000); // Разрешаем повторное сканирование через 1 секунду
                    },
                },
            ]
        );
    };

    if (hasPermission === null) {
        return <Text>Запрос разрешений...</Text>;
    }
    if (hasPermission === false) {
        return <Text>Доступ к камере запрещён.</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "pdf417", "org.iso.QRCode"], // Указываем только нужные типы
                }}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <Button title={"Сканировать снова"} onPress={() => setScanned(false)} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
});

export default QR;
