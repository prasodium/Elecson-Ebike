import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBg from "@/assets/images/bike-hero.png";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-end p-6 bg-cover bg-center" 
         style={{ backgroundImage: `url(${heroBg})` }}>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />

      <div className="relative z-10 w-full max-w-md space-y-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-display tracking-tighter">
            VOLT<span className="text-primary">RIDE</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            Control. Monitor. Ride.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-4 pt-8"
        >
          <Button 
            onClick={() => setLocation("/auth")}
            className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.3)] uppercase tracking-wider"
          >
            Get Started
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            v1.0.0 • Connected System
          </p>
        </motion.div>
      </div>
    </div>
  );
}
