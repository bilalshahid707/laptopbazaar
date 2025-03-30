import { Link } from "react-router-dom";

export const Error = ()=> {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-4xl font-bold mt-4">Oops! Something went wrong.</h1>
      <p className="text-gray-600 mt-2">The page you’re looking for doesn’t exist or an error occurred.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
export default Error