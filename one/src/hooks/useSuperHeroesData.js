import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

// NOTE : For post,update,delete data use must use useMutation
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: () => {
      // ACTION : Before, when we add data we manually fetch all data to show latest data to solve problem see below code
      // NOTE : It is useful when we add data in db and then refetch all data using invalidateQueries
      queryClient.invalidateQueries(["super-heroes"]);
    },
  });
};
