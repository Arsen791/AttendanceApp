import QRCode from 'react-qr-code';

export const generateQRCode = (value) => {
  try {
    const qrCode = <QRCode value={value} />;
    return qrCode;
  } catch (error) {
    console.error("Ошибка генерации QR-кода: ", error);
    return null;
  }
};
