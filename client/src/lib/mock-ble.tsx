import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
export interface BikeData {
  voltage: number;
  current: number;
  temperature: number;
  soc: number; // State of Charge %
  speed: number;
  odometer: number;
  range: number;
  isLocked: boolean;
  isPowered: boolean;
}

export interface BLEDevice {
  id: string;
  name: string;
  rssi: number;
}

interface BikeContextType {
  isConnected: boolean;
  isScanning: boolean;
  scannedDevices: BLEDevice[];
  bikeData: BikeData;
  startScan: () => void;
  stopScan: () => void;
  connectToDevice: (deviceId: string) => Promise<void>;
  disconnect: () => void;
  toggleLock: () => void;
  togglePower: () => void;
}

const defaultBikeData: BikeData = {
  voltage: 48.2,
  current: 0.0,
  temperature: 28,
  soc: 85,
  speed: 0,
  odometer: 1245,
  range: 45,
  isLocked: true,
  isPowered: false,
};

const BikeContext = createContext<BikeContextType | undefined>(undefined);

export function BikeProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedDevices, setScannedDevices] = useState<BLEDevice[]>([]);
  const [bikeData, setBikeData] = useState<BikeData>(defaultBikeData);

  // Simulate scanning
  const startScan = () => {
    setIsScanning(true);
    setScannedDevices([]);
    
    // Simulate finding devices over time
    setTimeout(() => {
      setScannedDevices((prev) => [...prev, { id: "ESP32-BIKE-01", name: "VoltRide X1", rssi: -65 }]);
    }, 1000);
    
    setTimeout(() => {
      setScannedDevices((prev) => [...prev, { id: "ESP32-BIKE-02", name: "VoltRide Pro", rssi: -72 }]);
    }, 2500);

    setTimeout(() => {
      setIsScanning(false);
    }, 5000);
  };

  const stopScan = () => setIsScanning(false);

  const connectToDevice = async (deviceId: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsConnected(true);
        setBikeData((prev) => ({ ...prev, isPowered: true, isLocked: false }));
        resolve();
      }, 1500);
    });
  };

  const disconnect = () => {
    setIsConnected(false);
    setBikeData(defaultBikeData);
  };

  const toggleLock = () => {
    setBikeData((prev) => ({ ...prev, isLocked: !prev.isLocked }));
  };

  const togglePower = () => {
    setBikeData((prev) => ({ ...prev, isPowered: !prev.isPowered }));
  };

  // Simulate telemetry when connected
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setBikeData((prev) => {
        // Random fluctuation for realism
        const speedChange = prev.isPowered && !prev.isLocked ? (Math.random() * 2 - 1) : 0;
        let newSpeed = Math.max(0, Math.min(45, prev.speed + speedChange));
        if (!prev.isPowered) newSpeed = 0;
        
        // Current usage based on speed
        const currentDraw = newSpeed > 0 ? (newSpeed / 2) + Math.random() : 0.5;

        return {
          ...prev,
          speed: parseFloat(newSpeed.toFixed(1)),
          current: parseFloat(currentDraw.toFixed(1)),
          voltage: parseFloat((48 - (prev.soc < 20 ? 4 : 0) + Math.random() * 0.2).toFixed(1)),
          temperature: parseFloat((28 + (currentDraw / 2)).toFixed(1)),
          range: parseFloat(((prev.soc / 100) * 60).toFixed(1))
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <BikeContext.Provider value={{
      isConnected,
      isScanning,
      scannedDevices,
      bikeData,
      startScan,
      stopScan,
      connectToDevice,
      disconnect,
      toggleLock,
      togglePower
    }}>
      {children}
    </BikeContext.Provider>
  );
}

export const useBike = () => {
  const context = useContext(BikeContext);
  if (!context) throw new Error("useBike must be used within a BikeProvider");
  return context;
};
