import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { BikeProvider } from "@/lib/mock-ble";
import Layout from "@/components/layout";
import Onboarding from "@/pages/onboarding";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import Scan from "@/pages/scan";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";
import Telemetry from "@/pages/telemetry"; // We'll need to create this

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Onboarding} />
        <Route path="/auth" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/scan" component={Scan} />
        <Route path="/settings" component={Settings} />
        <Route path="/telemetry" component={Telemetry} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BikeProvider>
        <Toaster />
        <Router />
      </BikeProvider>
    </QueryClientProvider>
  );
}

export default App;
