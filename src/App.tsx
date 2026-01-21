import { Toaster } from "@/components/ui/sonner";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Matrix from "@/pages/Matrix";
import ContactPage from "@/pages/ContactPage";
import Navbar from "@/components/Navbar";

function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/matrix" component={Matrix} />
        <Route path="/contact" component={ContactPage} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Toaster theme="dark" position="top-center" />
      <Navbar />
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
