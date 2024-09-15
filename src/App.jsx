/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import SearchParams from "./pages/SearchParams";
import Details from "./pages/Details";
import AdoptedPetContext from "./pages/AdoptedPetContext";
import "./styles/styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: Infinity,
    cacheTime: Infinity,
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link path="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
