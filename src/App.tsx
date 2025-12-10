import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Recommendations from "./pages/Recommendations";
import BasicQuestion from "./pages/BasicQuestion";
import Reviews from "./pages/Reviews";
import Guides from "./pages/Guides";
import CreditBasics from "./pages/CreditBasics";
import TwoCardCombo from "./pages/TwoCardCombo";
import LoungeAccess from "./pages/LoungeAccess";
import HowCreditCardsMakeMoney from "./pages/HowCreditCardsMakeMoney";
import MinimumSpendRequirements from "./pages/MinimumSpendRequirements";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/question" element={<BasicQuestion />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/credit-basics" element={<CreditBasics />} />
          <Route path="/guides/2-card-combo" element={<TwoCardCombo />} />
          <Route path="/guides/lounge-access" element={<LoungeAccess />} />
          <Route path="/guides/how-credit-cards-make-money" element={<HowCreditCardsMakeMoney />} />
          <Route path="/guides/minimum-spend-requirements" element={<MinimumSpendRequirements />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
