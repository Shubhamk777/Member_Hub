
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import MemberAdd from "./pages/MemberAdd";
import MemberEdit from "./pages/MemberEdit";
import MemberView from "./pages/MemberView";
import Certificates from "./pages/Certificates";
import CertificateGenerate from "./pages/CertificateGenerate";
import Reminders from "./pages/Reminders";
import Documents from "./pages/Documents";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/members/add" element={<MemberAdd />} />
            <Route path="/members/:id" element={<MemberView />} />
            <Route path="/members/edit/:id" element={<MemberEdit />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/certificates/generate" element={<CertificateGenerate />} />
            <Route path="/certificates/generate/:memberId" element={<CertificateGenerate />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
