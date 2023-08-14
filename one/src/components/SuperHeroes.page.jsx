import axios from "axios";
import { useEffect, useState } from "react";

function SuperHeroes() {
  console.count("SuperHeroes");

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/superheroes`)
      .then((result) => {
        console.log("Result = ", result);
        setData(result.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error while fetching data at SuperHeroes = ", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading.......</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h2>SuperHeroes Page</h2>
      {data?.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </div>
  );
}

export default SuperHeroes;
