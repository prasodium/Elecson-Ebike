import { useBike } from "@/lib/mock-ble";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useState, useEffect } from "react";

export default function Telemetry() {
  const { bikeData, isConnected } = useBike();
  const [history, setHistory] = useState<any[]>([]);

  // Accumulate data for charts
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setHistory(prev => {
        const newData = {
          time: new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          voltage: bikeData.voltage,
          current: bikeData.current,
          temp: bikeData.temperature
        };
        const newHistory = [...prev, newData];
        if (newHistory.length > 20) newHistory.shift(); // Keep last 20 points
        return newHistory;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected, bikeData]);

  if (!isConnected) {
    return (
      <div className="p-8 text-center text-muted-foreground h-full flex flex-col items-center justify-center">
        Connect to device to view live telemetry.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-display font-bold">Live Telemetry</h1>

      <div className="space-y-6">
        {/* Voltage Chart */}
        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-widest text-primary">Voltage (V)</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorVoltage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" tick={{fontSize: 10}} stroke="rgba(255,255,255,0.3)" />
                <YAxis domain={[40, 55]} tick={{fontSize: 10}} stroke="rgba(255,255,255,0.3)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="voltage" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorVoltage)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Current Chart */}
        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-widest text-purple-400">Current (A)</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" tick={{fontSize: 10}} stroke="rgba(255,255,255,0.3)" />
                <YAxis domain={[0, 30]} tick={{fontSize: 10}} stroke="rgba(255,255,255,0.3)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="current" stroke="#a855f7" fillOpacity={1} fill="url(#colorCurrent)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
