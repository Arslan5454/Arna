import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const NotFound = () => {
  //use navigation in Buttons
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const error = useRouteError();

  if (error?.status === 404) {
    return (
      <section className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="mb-6">
          <figure>
            <img
              src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif"
              alt="404 Not Found"
              className="max-w-full h-auto"
            />
          </figure>
          <div className="text-center mt-4">
            <p className="text-lg font-medium text-gray-700">
              The page you were looking for could not be found.
            </p>
          </div>
        </div>
        <button
          onClick={handleBackClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 px-6 transition duration-300"
        >
          Back To Home Page
        </button>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-center items-center min-h-screen p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-2">
        Something went wrong
      </h1>
      <p className="text-gray-700 mb-4">
        {error?.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={handleBackClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 px-6 transition duration-300"
      >
        Go to Home
      </button>
    </section>
  );
};

export default NotFound;
