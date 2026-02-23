import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Learning from "./pages/Learning";
import NotFound from "./pages/NotFound";
import ModernLandingPage from "./pages/ModernLandingPage";
import Interactive3DDashboard from "./pages/Interactive3DDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ModernLandingPage />} />
          <Route path="/dashboard" element={<Interactive3DDashboard />} />
          <Route path="/learn/:subject" element={<Learning />} />
          <Route path="/learn/:subject/:chapter" element={<Learning />} />
          <Route path="/learn/:subject/:chapter/:topic" element={<Learning />} />
          {/* Redirects for old routes */}
          <Route path="/class-selection" element={<Navigate to="/dashboard" replace />} />
          <Route path="/subject/:subjectId" element={<Navigate to="/dashboard" replace />} />
          <Route path="/home" element={<Navigate to="/dashboard" replace />} />
          <Route path="/about" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
