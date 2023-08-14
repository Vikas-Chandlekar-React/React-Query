import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import "../App.css";

const onSuccess = (data) => {
  console.log("Perform side effect after data fetching = ", data);
};

const onError = (error) => {
  console.log("Perform side effect after encountering error = ", error);
};

function RQSuperHeroes() {
  console.count("RQSuperHeroes");

  const { data, isLoading, isError, error, isFetching } = useSuperHeroesData(
    onSuccess,
    onError
  );

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
      {data?.data?.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default RQSuperHeroes;
