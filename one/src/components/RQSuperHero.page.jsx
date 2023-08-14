import { useNavigate, useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

function RQSuperHero() {
  console.count("RQSuperHero");

  const { heroId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, isFetching } =
    useSuperHeroData(heroId);

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
      <h1>RQSuperHero Details</h1>
      <button
        onClick={() => {
          navigate("/rq-super-heroes");
        }}
      >
        Back
      </button>
      <h2>
        {data?.data.name} - {data?.data.alterEgo}
      </h2>
    </div>
  );
}

export default RQSuperHero;
