import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = async () => {
  console.count("After api call");
  return await axios.get(`http://localhost:4000/superheroes`);
};

export const useSuperHeroesData = (onSuccessFun, onErrorFun) => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    onSuccess: onSuccessFun,
    onError: onErrorFun,
  });
};
