import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

// TOPIC : Parallel Queries
function ParallelQueries() {
  console.count("ParallelQueries");
  const { data: superHeroes } = useQuery(["super-heroes"], fetchSuperHeroes);
  const { data: friends } = useQuery(["friends"], fetchFriends);
  return (
    <div>
      <h1>Parallel Queries</h1>
    </div>
  );
}

export default ParallelQueries;
