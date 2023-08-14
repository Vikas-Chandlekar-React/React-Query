import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = async () => {
  console.count("After api call");
  return await axios.get(`http://localhost:4000/superheroes`);
};

function RQSuperHeroes() {
  console.count("RQSuperHeroes");

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    enabled: false,
  });

  console.log({ isLoading, isFetching });

  // if (isLoading) {
  //   return <h2>Loading.....</h2>;
  // }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h2>RQSuperHeroes Page</h2>
      <button onClick={refetch}>Fetch Data</button>
      {data?.data?.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </div>
  );
}

export default RQSuperHeroes;
