import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Home from "./components/Home.page";
import SuperHeroes from "./components/SuperHeroes.page";
import RQSuperHeroes from "./components/RQSuperHeroes.page";
import Navbar from "./components/Navbar/Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RQSuperHero from "./components/RQSuperHero.page";
import ParallelQueries from "./components/ParallelQueries.page";
import DynamicParallelQueries from "./components/DynamicParallelQueries.page";
import DependentQueries from "./components/DependentQueries.page";
import PaginatedQueries from "./components/PaginatedQueries.page";
import InfiniteQueries from "./components/InfiniteQueries.page";
import RQPostSuperHeroes from "./components/RQPostSuperHeroes.page";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/super-heroes" element={<SuperHeroes />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroes />} />
            <Route path="/rq-super-heroes/:heroId" element={<RQSuperHero />} />
            <Route path="/rq-parallel" element={<ParallelQueries />} />
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallelQueries heroIds={[1, 3]} />}
            />
            <Route
              path="/rq-dependent"
              element={<DependentQueries email="vishwas@example.com" />}
            />
            <Route path="/rq-paginated" element={<PaginatedQueries />} />
            <Route path="/rq-infinite" element={<InfiniteQueries />} />
            <Route path="/rq-post-super-heroes" element={<RQPostSuperHeroes />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
