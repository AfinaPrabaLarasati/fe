import React, { useState } from 'react';
import jsQR from 'jsqr';

const QrCodeDetector = () => {
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];

    try {
      const fileContent = await readFile(selectedFile);
      const code = await decodeQRCode(fileContent);
      
      if (code) {
        setQrCodeValue(code.data);
      } else {
        setQrCodeValue('QR code not found');
      }
    } catch (error) {
      console.error('Error reading or decoding QR code:', error);
      setQrCodeValue('Error reading or decoding QR code');
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const decodeQRCode = (imageData) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageData;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);

        const imageDataArray = ctx.getImageData(0, 0, image.width, image.height).data;

        try {
          const code = jsQR(imageDataArray, image.width, image.height);
          resolve(code);
        } catch (error) {
          reject(error);
        }
      };
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <label htmlFor="fileInput" style={{ display: 'block', marginBottom: '10px' }}>
        Upload Image:
      </label>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <button
        style={{
          width: '200px',
          height: '40px',
          backgroundColor: '#007bff',
          color: '#fff',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => document.getElementById('fileInput').click()}
      >
        Choose File
      </button>

      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Result: {qrCodeValue}</p>
      {imagePreview && (
        <img src={imagePreview} alt="Image Preview" style={{ width: '50%', marginTop: '20px' }} />
      )}
    </div>
  );
};

export default QrCodeDetector;
