import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = async () => {
  console.count("After api call");
  return await axios.get(`http://localhost:4000/superheroes`);
};

const transformData = (data) => {
  const superHeroNames = data?.data.map((hero) => hero.name);
  return superHeroNames;
};

function RQSuperHeroes() {
  console.count("RQSuperHeroes");

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    select: transformData,
  });

  console.log({ isLoading, isFetching });
  console.log(data);

  if (isLoading) {
    return <h2>Loading.....</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h2>RQSuperHeroes Page</h2>
      {data.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))}
    </div>
  );
}

export default RQSuperHeroes;
