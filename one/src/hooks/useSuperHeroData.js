import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const fetchSuperHero = async (heroId) => {
//   console.count("After api call");
//   return await axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };

// export const useSuperHeroData = (heroId) => {
//   return useQuery({
//     queryKey: ["super-heroes", heroId],
//     queryFn: () => fetchSuperHero(heroId),
//   });
// };

// or

const fetchSuperHero = async ({ queryKey }) => {
  console.log("queryKey = ", queryKey);
  const heroId = queryKey[1];
  console.count("After api call");
  return await axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  return useQuery({
    queryKey: ["super-heroes", heroId],
    queryFn: fetchSuperHero,
  });
};
