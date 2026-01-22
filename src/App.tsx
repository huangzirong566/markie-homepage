import { Toaster } from "@/components/ui/sonner";
import { Router, Route, Switch, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Matrix from "@/pages/Matrix";
import ContactPage from "@/pages/ContactPage";
import ChatPage from "@/pages/ChatPage";
import Navbar from "@/components/Navbar";

function AppRouter() {
  const [location] = useLocation();
  const hideNavbar = location === "/chat"; // Chat 页面有自己的布局

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/matrix" component={Matrix} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/chat" component={ChatPage} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Toaster theme="dark" position="top-center" />
      <Router hook={useHashLocation}>
        <AppRouter />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
