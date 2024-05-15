import React from "react";
import { Link } from "react-router-dom";
import { BookOpenIcon, HeartIcon } from "@heroicons/react/outline";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center">
            <BookOpenIcon className="h-8 w-8 text-yellow-200 mr-2" />
            <span className="text-xl font-bold">Blog Bliss</span>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-4 ml-10">
            <Link
              to="/"
              className="hover:text-gray-300 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/create-post"
              className="hover:text-gray-300 transition duration-300"
            >
              Create Blog
            </Link>
            <Link
              to="/posts"
              className="hover:text-gray-300 transition duration-300"
            >
              Blogs
            </Link>
            <Link
              to="/register"
              className="hover:text-gray-300 transition duration-300"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="hover:text-gray-300 transition duration-300"
            >
              Login
            </Link>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="mr-2">Made with </p>
            <HeartIcon className="h-5 w-5 text-red-500" />
            <p className="ml-2">Blockchain</p>
          </div>
        </div>
        <div className="mt-8 text-sm text-gray-500 text-center">
          <p>&copy; {new Date().getFullYear()} Blog Bliss. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
