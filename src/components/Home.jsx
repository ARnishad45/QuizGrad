import React, { useState } from "react";
import banner from "../images/banner.png";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  
  const handleStartQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/quiz')
      setLoading(false);
    },2500)
  }
  return (
    <section className="lg:w-9/12 md:w-[90%] px-4 mx-auto mt-12 flex flex-col md:flex-row-reverse justify-between items-center ">
      {loading && <Loading />}
      <div className="md:w-1/2 w-full">
        <img src={banner} alt="banner" className="w-full mx-auto" />
      </div>
      {/* left side */}
      <div className="md:w-1/2 w-full space-y-8 mb-5">
        <h2 className="my-8 lg:text-4xl text-3xl font-medium text-[#333] md:w-4/6 lg:leading-normal leading-normal mb-3">
          Learn new concept for each question
        </h2>
        <p className="py-2 mb-6 text-gray-600 pl-2 border-l-4 border-indigo-700 text-base">
          We help you prepare for exams and quizzes
        </p>
        <div className="text-lg font-medium flex flex-col sm:flex-row  gap-5 ">
          <button onClick = {handleStartQuiz} className="bg-primary px-6 py-2 text-white rounded ">
            Start Quiz
          </button>
          <button className="inline-flex items-center px-6 py-2 rounded border text-primary ml-3 hover:bg-primary hover:text-white transition-all duration-300 ease-in ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            Know More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
