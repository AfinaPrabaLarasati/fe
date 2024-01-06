import React, { useState } from 'react';
import jsQR from 'jsqr';

const QRCodeReader = () => {
  const [qrCodeValue, setQRCodeValue] = useState('');
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setQRCodeValue('');
      decodeQRCode(fileContent);
      setImagePreview(fileContent);
    };
    reader.readAsDataURL(selectedFile);
  };

  const redirectToUrl = (url) => {
    // window.open(url, '_blank');
    window.location.href = url;
  };

  const decodeQRCode = async (imageData) => {
    const image = new Image();
    image.src = imageData;

    image.onload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const imageDataArray = ctx.getImageData(0, 0, image.width, image.height).data;
      
      try {
        const code = jsQR(imageDataArray, image.width, image.height);

        if (code) {
          setQRCodeValue(code.data);
          // Redirect only if the decoded value is a valid URL
          if (isValidUrl(code.data)) {
            redirectToUrl(code.data);
          }
        } else {
          setQRCodeValue('QR code not found');
        }
      } catch (error) {
        console.error('Error decoding QR code:', error);
        setQRCodeValue('Error decoding QR code');
      } finally {
        setLoading(false);
      }
    };
  };

  const isValidUrl = (url) => {
    // Add your own URL validation logic here
    // You may want to check if the URL is well-formed or meets specific criteria
    return true;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <label htmlFor="fileInput" style={{ display: 'block', marginBottom: '10px' }}>
        Upload QR Code Image:
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

      {isLoading && <p>Loading...</p>}

      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Result: {qrCodeValue}</p>
      {imagePreview && (
        <img src={imagePreview} alt="Image Preview" style={{ width: '50%', marginTop: '20px' }} />
      )}
    </div>
  );
};

export default QRCodeReader;
