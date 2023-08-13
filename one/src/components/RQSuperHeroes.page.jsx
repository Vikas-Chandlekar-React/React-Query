import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get(`http://localhost:4000/superheroes`);
};

function RQSuperHeroes() {
  console.count("RQSuperHeroes");

  const { data, isLoading } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
  });

  if (isLoading) {
    return <h2>Loading.....</h2>;
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
