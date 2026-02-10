import { Link, useLocation } from "wouter";
import { Home, Zap, Settings, Bluetooth, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  // Hide nav on onboarding and auth pages
  const hideNav = location === "/" || location === "/auth";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-hidden">
      <main className="flex-1 flex flex-col relative overflow-y-auto pb-24 no-scrollbar">
        {children}
      </main>

      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border z-50 pb-safe">
          <div className="flex justify-around items-center h-16 max-w-md mx-auto">
            <NavItem href="/dashboard" icon={Home} label="Home" active={location === "/dashboard"} />
            <NavItem href="/scan" icon={Bluetooth} label="Connect" active={location === "/scan"} />
            <NavItem href="/telemetry" icon={Activity} label="Stats" active={location === "/telemetry"} />
            <NavItem href="/settings" icon={Settings} label="Settings" active={location === "/settings"} />
          </div>
        </nav>
      )}
    </div>
  );
}

function NavItem({ href, icon: Icon, label, active }: { href: string, icon: any, label: string, active: boolean }) {
  return (
    <Link href={href}>
      <a className={cn(
        "flex flex-col items-center justify-center w-16 h-full transition-all duration-300",
        active ? "text-primary scale-110 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]" : "text-muted-foreground hover:text-foreground"
      )}>
        <Icon size={24} strokeWidth={active ? 2.5 : 2} />
        <span className="text-[10px] mt-1 font-medium">{label}</span>
      </a>
    </Link>
  );
}
