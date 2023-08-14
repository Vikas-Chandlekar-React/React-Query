import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  console.count("After api call");
  return axios.get(`http://localhost:4000/superheroes`);
};

function RQSuperHeroes() {
  console.count("RQSuperHeroes");

  /**  DESC : refetchOnWindowFocus : true/false/"always"
   * Default : true
   * When component get focus it will call api
   */
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    refetchOnWindowFocus: true,
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
