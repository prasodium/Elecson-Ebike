import { useEffect } from "react";
import { useBike } from "@/lib/mock-ble";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Battery, Lock, Unlock, Zap, ZapOff, Bluetooth, MapPin, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { bikeData, isConnected, toggleLock, togglePower, disconnect } = useBike();
  const [, setLocation] = useLocation();

  // Redirect to scan if not connected (optional logic, but good for UX)
  // useEffect(() => { if (!isConnected) setLocation("/scan"); }, [isConnected, setLocation]);

  if (!isConnected) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 space-y-6 text-center">
        <div className="w-32 h-32 rounded-full bg-muted/20 flex items-center justify-center animate-pulse">
          <Bluetooth className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold font-display">Disconnected</h2>
        <p className="text-muted-foreground">Connect to your VoltRide bike to access controls.</p>
        <Button onClick={() => setLocation("/scan")} size="lg" className="w-full max-w-xs bg-primary text-primary-foreground">
          Connect Now
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Status</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-bold text-green-500">CONNECTED</span>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Range</h2>
          <span className="font-display text-xl font-bold">{bikeData.range} km</span>
        </div>
      </div>

      {/* Speedometer Main */}
      <div className="relative h-64 flex items-center justify-center">
        <svg className="w-64 h-64 transform -rotate-90">
          <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-muted/20" />
          <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="4" fill="transparent" 
            className="text-primary transition-all duration-300 ease-out"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={2 * Math.PI * 120 * (1 - bikeData.speed / 45)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-black font-display tracking-tighter glow-text">
            {bikeData.speed.toFixed(0)}
          </span>
          <span className="text-sm text-muted-foreground uppercase tracking-widest">km/h</span>
        </div>
      </div>

      {/* Primary Controls */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className={`h-24 flex flex-col gap-2 rounded-2xl border-2 transition-all ${bikeData.isLocked ? "border-destructive text-destructive bg-destructive/10" : "border-primary text-primary bg-primary/10"}`}
          onClick={toggleLock}
        >
          {bikeData.isLocked ? <Lock className="h-8 w-8" /> : <Unlock className="h-8 w-8" />}
          <span className="font-bold uppercase">{bikeData.isLocked ? "Locked" : "Unlocked"}</span>
        </Button>
        
        <Button 
          variant="outline" 
          className={`h-24 flex flex-col gap-2 rounded-2xl border-2 transition-all ${bikeData.isPowered ? "border-green-500 text-green-500 bg-green-500/10" : "border-muted-foreground text-muted-foreground bg-muted/10"}`}
          onClick={togglePower}
        >
          {bikeData.isPowered ? <Zap className="h-8 w-8" /> : <ZapOff className="h-8 w-8" />}
          <span className="font-bold uppercase">{bikeData.isPowered ? "ON" : "OFF"}</span>
        </Button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={Battery} label="SOC" value={`${bikeData.soc}%`} />
        <StatCard icon={Zap} label="Voltage" value={`${bikeData.voltage}V`} />
        <StatCard icon={MapPin} label="ODO" value={`${bikeData.odometer}`} />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
      <div className="p-3 flex flex-col items-center gap-1 text-center">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground uppercase">{label}</span>
        <span className="font-bold font-mono text-sm">{value}</span>
      </div>
    </Card>
  );
}
