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
// export const useAddSuperHeroData = () => {
//   const queryClient = useQueryClient();
//   return useMutation(addSuperHero, {
//     onSuccess: (data) => {
//       // ACTION : Before, when we add data we manually fetch all data to show latest data to solve problem see below code
//       // NOTE : It is useful when we add data in db and then refetch all data using invalidateQueries
//       // queryClient.invalidateQueries(["super-heroes"]);
//       // DESC : 2 API request 1 for post and 1 for get all data so we save additional api request for get all data
//       // NOTE : setQueriesData : use for update then query cache data
//       queryClient.setQueriesData(["super-heroes"], (oldQueryData) => {
//         return {
//           ...oldQueryData,
//           data: [...oldQueryData.data, data.data],
//         };
//       });
//     },
//   });
// };

// TOPIC : OPTIMISTIC UPDATE
/** DESC :  Updating the state before performing mutation under the assumption
 *  that nothing can go wrong. It is typically give an impression that your app is
 *  pleasing fast
 */
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    /** DESC : onMutate :
     *  It is called before mutation function is fired and is passed the same variables
     *  the mutation function would receive
     */
    onMutate: async (newHero) => {
      await queryClient.cancelQueries(["super-heroes"]);
      const previousHeroData = queryClient.getQueryData(["super-heroes"]);

      queryClient.setQueryData(["super-heroes"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      // DESC : It is used to rollback data in case the mutation errors out
      return { previousHeroData };
    },

    /** DESC : onError :
     *  It is called when mutation encounters error.
     *  It contain 3 arguments.
     */
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["super-heroes"], context.previousHeroData);
    },
    /** DESC : onSettled :
     *  It is called when either successful or when it encounters an errors
     */
    onSettled: () => {
      queryClient.invalidateQueries(["super-heroes"]);
    },
  });
};
