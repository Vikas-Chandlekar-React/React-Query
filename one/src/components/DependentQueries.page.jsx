import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

function DependentQueries({ email }) {
  console.count("DependentQueries");

  // NOTE : OLD WAY
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );

  // NOTE : NEW WAY
  //   const { data: user } = useQuery({
  //     queryKey: ["user", email],
  //     queryFn: () => fetchUserByEmail(email),
  //   });

  console.log({ user });

  const channelId = user?.data?.channelId;

  // NOTE : OLD WAY
  const { data: courses } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  console.log("Courses = ", courses);
  console.log(courses?.data);

  return (
    <div>
      <h1>Dependent Queries</h1>
      {courses?.data?.courses?.map((course) => (
        <p key={course}>{course}</p>
      ))}
    </div>
  );
}

export default DependentQueries;
