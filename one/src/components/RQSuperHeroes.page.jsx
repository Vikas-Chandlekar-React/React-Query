import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  console.count("After api call");
  return axios.get(`http://localhost:4000/superheroes`);
};

function RQSuperHeroes() {
  console.count("RQSuperHeroes");

  /**  DESC : refetchOnWindowFocus : false/time in ms
   * Default : false
   * If you want to api call after regular interval
   * Note : it will not polling when component lost focus (not working on background)
   * If you want to polling work on background then you must use refetchIntervalInBackground: true
   */
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
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
