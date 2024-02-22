import React from "react";
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}: ${String(
    remainingSeconds
  ).padStart(2, "0")}`;
  return formattedTime;
};

const QuizHeader = ({timer}) => {
  return (
    <div className="shadow-sm my-5 py-2 sticky top-0 bg-white z-10">
      <div className="w-9/12 mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-s">
          <p>Attention! You have 120 seconds to answer 20 questions</p>
          <p>
            Please keep an eye on the timer and make sure to answer all question
            before time runs out.
          </p>
        </div>

        <div>
          <h1 className="text-xl text-green-700">{formatTime(timer)} </h1>
          <p>Time consumed</p>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
