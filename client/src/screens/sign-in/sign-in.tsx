import React from "react";
import { AUTH_URL } from "../../api/auth/auth";

const SignIn = () => {
  return (
    <div>
      <h1>sign in</h1>
      <a
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        href={AUTH_URL}
      >
        Click Me
      </a>
    </div>
  );
};

export default SignIn;
