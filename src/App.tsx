import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Router, Route, Switch, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import Matrix from "@/pages/Matrix";
import ChatPage from "@/pages/ChatPage";
import TextConverter from "@/pages/TextConverter";
import SunnyMapPage from "@/pages/SunnyMapPage";
import Navbar from "@/components/Navbar";

function LegacyAppRouter() {
  const [location] = useLocation();
  const hideNavbar =
    location === "/chat" ||
    location === "/tools" ||
    location === "/portfolio" ||
    location === "/contact";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/portfolio" component={Home} />
        <Route path="/matrix" component={Matrix} />
        <Route path="/contact" component={Home} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/tools" component={TextConverter} />
        <Route path="/sunny-map" component={SunnyMapPage} />
      </Switch>
    </>
  );
}

function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isLegacyRoute = hash.startsWith("#/") && hash !== "#/";

  return (
    <ErrorBoundary>
      {isLegacyRoute ? (
        <>
          <Toaster theme="dark" position="top-center" />
          <Router hook={useHashLocation}>
            <LegacyAppRouter />
          </Router>
        </>
      ) : (
        <Home />
      )}
    </ErrorBoundary>
  );
}

export default App;
