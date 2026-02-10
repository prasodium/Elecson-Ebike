import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Shield, LogOut, Bell, Share2 } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({ title: "Logged out" });
    setLocation("/auth");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-display font-bold">Settings</h1>

      <div className="space-y-4">
        {/* User Profile */}
        <Card className="bg-card/50 border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                JD
              </div>
              <div>
                <div className="font-bold">John Doe</div>
                <div className="text-sm text-muted-foreground">Owner • pilot@voltride.com</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Access Control */}
        <Card className="bg-card/50 border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-500" /> Access Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-3 border-white/10 hover:bg-white/5">
              <Share2 className="h-4 w-4" /> Manage Authorized Users
            </Button>
            <div className="text-xs text-muted-foreground px-1">
              Grant temporary access to other riders.
            </div>
          </CardContent>
        </Card>

         {/* Notifications */}
         <Card className="bg-card/50 border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-500" /> Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
             <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <span className="text-sm">Battery Low Alert</span>
                <div className="h-3 w-3 rounded-full bg-green-500" />
             </div>
             <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <span className="text-sm">Motion Detection</span>
                <div className="h-3 w-3 rounded-full bg-green-500" />
             </div>
          </CardContent>
        </Card>

        <Button variant="destructive" className="w-full mt-8" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Log Out
        </Button>
      </div>
    </div>
  );
}
