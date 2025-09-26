import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Learning from "./pages/Learning";
import EnhancedTopicPage from "./pages/EnhancedTopicPage";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import ModernLandingPage from "./pages/ModernLandingPage";
import About from "./pages/About";
import Interactive3DDashboard from "./pages/Interactive3DDashboard";
import SubjectDashboard from "./pages/SubjectDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ModernLandingPage />} />
          <Route path="/home" element={<Index />} />
          <Route path="/dashboard" element={<Interactive3DDashboard />} />
          <Route path="/subject/:subjectId" element={<SubjectDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/learn/:subject" element={<Learning />} />
          <Route path="/learn/:subject/:topic" element={<EnhancedTopicPage />} />
          {/* Explicitly define the Hindi prefixes-suffixes route */}
          <Route path="/learn/hindi/prefixes-suffixes" element={<EnhancedTopicPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;