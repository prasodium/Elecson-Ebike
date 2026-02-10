import { useBike } from "@/lib/mock-ble";
import { Button } from "@/components/ui/button";
import { Bluetooth, RefreshCw, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function Scan() {
  const { isScanning, scannedDevices, startScan, connectToDevice, isConnected, disconnect } = useBike();
  const [, setLocation] = useLocation();

  const handleConnect = async (id: string) => {
    await connectToDevice(id);
    setLocation("/dashboard");
  };

  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold">Connections</h1>
        {isConnected && (
          <Button variant="destructive" size="sm" onClick={disconnect}>Disconnect</Button>
        )}
      </div>

      <div className="bg-card/30 rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 border border-white/5 min-h-[200px]">
        {isScanning ? (
          <>
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
              <Bluetooth className="h-12 w-12 text-primary relative z-10" />
            </div>
            <p className="text-muted-foreground animate-pulse">Scanning for devices...</p>
          </>
        ) : (
          <>
            <Bluetooth className="h-12 w-12 text-muted-foreground" />
            <Button onClick={startScan} variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
              <RefreshCw className="h-4 w-4" /> Start Scan
            </Button>
          </>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest pl-2">Available Devices</h3>
        
        {scannedDevices.length === 0 && !isScanning && (
          <div className="text-center p-8 text-muted-foreground text-sm border border-dashed border-white/10 rounded-xl">
            No devices found. Ensure your bike is powered on.
          </div>
        )}

        {scannedDevices.map((device) => (
          <motion.div 
            key={device.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 bg-card/50 border border-white/5 rounded-xl hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold">{device.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{device.id} • RSSI: {device.rssi}dBm</div>
              </div>
            </div>
            <Button size="sm" onClick={() => handleConnect(device.id)}>Connect</Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
