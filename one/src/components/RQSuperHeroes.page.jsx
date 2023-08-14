import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  console.count("After api call");
  return axios.get(`http://localhost:4000/superheroes`);
};

function RQSuperHeroes() {
  console.count("RQSuperHeroes");

  /**  DESC : staleTime :
   *  - default : 0 ms
   *  - When we don't use this state is stale state
   * and when we use this state is fresh after we specified time elapsed
   * state change from fresh state to stale state
   *  - When we come back again before time we specified then no api called happened because it is fresh state
   */
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    staleTime: 30000,
  });

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <h2>Loading.....</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h2>RQSuperHeroes Page</h2>
      {data?.data?.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </div>
  );
}

export default RQSuperHeroes;
