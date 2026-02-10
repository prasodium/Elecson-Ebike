import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock Auth delay
    setTimeout(() => {
      setLoading(false);
      toast({
        title: isLogin ? "Welcome back!" : "Account created",
        description: "Successfully authenticated with Firebase.",
      });
      setLocation("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-full flex flex-col p-6 max-w-md mx-auto justify-center">
      <Button 
        variant="ghost" 
        className="self-start mb-8 -ml-4 text-muted-foreground hover:text-white"
        onClick={() => setLocation("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-xl shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {isLogin ? "System Access" : "New Pilot Registration"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin ? "Enter your credentials to connect" : "Create a secure profile to bind your bike"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="pilot@voltride.com" className="pl-10 bg-background/50 border-white/10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10 bg-background/50 border-white/10" required />
                </div>
              </div>
              
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="device">Device ID (Optional)</Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="device" placeholder="ESP32-XXXX" className="pl-10 bg-background/50 border-white/10" />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 mt-4" disabled={loading}>
                {loading ? "Authenticating..." : (isLogin ? "Initialize Link" : "Register Pilot")}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
