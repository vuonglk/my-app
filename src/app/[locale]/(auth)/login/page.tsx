"use client";

import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  function handleClick() {
    document.cookie = `accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiaWF0IjoxNzE4MjAyOTQ2LCJleHAiOjYxNzE4MjAyOTQ2fQ.F3rIK1Cn3wJGlKIF8qUCi6gX-rneUE5uaxtQscroCeA"`;
    router.push("/admin");
  }

  return (
    <h1>
      <button className="bg-red-700" onClick={handleClick}>
        login và set JWT vào cookie{" "}
      </button>
    </h1>
  );
};

export default Login;
