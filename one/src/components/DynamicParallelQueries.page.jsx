import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

function DynamicParallelQueries({ heroIds }) {
  console.count("DynamicParallelQueries");

  // NOTE : For dynamic parallel queries must use useQueries
  const queryResults = useQueries({
    queries: heroIds?.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    }),
  });

  console.log({ queryResults });

  return (
    <div>
      <h1>Dynamic Parallel Queries</h1>
      {}
    </div>
  );
}

export default DynamicParallelQueries;
