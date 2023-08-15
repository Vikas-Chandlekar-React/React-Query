import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

function InfiniteQueries() {
  console.count("InfiniteQueries");

  // NOTE : use useInfiniteQuery for InfiniteQueries
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      console.log("In getNextPageParam = ", _lastPage, pages);
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  console.log({ hasNextPage });
  console.log({ isFetching, isFetchingNextPage });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h1>Infinite Queries</h1>
      {data?.pages.map((group, i) => {
        console.log({ group, i });
        return (
          <Fragment key={i}>
            {group?.data?.map((color) => (
              <h2 key={color.id}>
                {color.id} {color.label}
              </h2>
            ))}
          </Fragment>
        );
      })}
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load More
      </button>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
}

export default InfiniteQueries;
