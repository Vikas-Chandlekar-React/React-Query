import { useQuery, useQueryClient } from "@tanstack/react-query";
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

// export const useSuperHeroData = (heroId) => {
//   return useQuery({
//     queryKey: ["super-heroes", heroId],
//     queryFn: fetchSuperHero,
//   });
// };

// TOPIC : Initial Query Data
export const useSuperHeroData = (heroId) => {
  // NOTE : useQueryClient instance has access to query cache data for setting initial data
  const queryClient = useQueryClient();

  // ACTION : NEW WAY
  // return useQuery({
  //   queryKey: ["super-heroes", heroId],
  //   queryFn: fetchSuperHero,
  //   initialData: () => {
  //     const hero = queryClient
  //       .getQueryData(["super-heroes"])
  //       ?.data?.find((hero) => hero.id === parseInt(heroId));

  //     if (hero) {
  //       return { data: hero };
  //     } else {
  //       return undefined;
  //     }
  //   },
  // });

  // ACTION : OLD WAY
  return useQuery(["super-heroes", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData(["super-heroes"])
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
};
