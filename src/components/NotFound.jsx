import React from "react";
function NotFound() {
  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center mt-8">
          <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
          <img
            src="./images/notfound.jfif"
            alt="Not Found"
            className="w-64 h-64 mb-4"
          />
          <p className="text-gray-600">
            Sorry, the page you are looking in not found.
          </p>
        </div>
      </div>
    </>
  );
}

export default NotFound;
