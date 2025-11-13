/**
 * COMPONENTE QR SCANNER
 *
 * Permite escanear códigos QR usando la cámara del dispositivo
 * Usa la librería html5-qrcode
 */

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, X } from 'lucide-react';

interface QRScannerProps {
  onScan: (code: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanning = useRef(false);

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    if (isScanning.current) return;

    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;
      isScanning.current = true;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          // Extraer el código del URL si es necesario
          const url = new URL(decodedText);
          const code = url.searchParams.get('code') || decodedText;
          onScan(code);
          stopScanner();
        },
        (errorMessage) => {
          // Error de escaneo (normal cuando no detecta QR)
          // No hacer nada aquí para evitar spam de errores
        }
      );
    } catch (err) {
      setError('No se pudo acceder a la cámara. Verifica los permisos.');
      console.error('Error starting scanner:', err);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      } finally {
        isScanning.current = false;
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Escanear QR
          </h3>
          <button
            onClick={() => {
              stopScanner();
              onClose();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <>
            <div id="qr-reader" className="rounded-lg overflow-hidden"></div>
            <p className="text-sm text-gray-600 text-center mt-4">
              Apunta la cámara al código QR de la invitación
            </p>
          </>
        )}
      </div>
    </div>
  );
}
