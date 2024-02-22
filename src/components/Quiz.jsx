import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizHeader from "./QuizHeader";
const Loading = () => (
  <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[30%] rounded-bl-[30%]">
    <p className="text-xl text-gray-600">Loading...</p>
  </div>
)

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}: ${String(remainingSeconds).padStart(2, "0")}`
  return formattedTime;
}

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResult, setshowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [timerIntervalId, setTimerIntervalId] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/quiz.json")
      .then((res) => res.json())
      .then((data) => {
        //console log data
        setQuestions(data);
      });
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimerIntervalId(intervalId);

    return () => {
      clearInterval(intervalId);
      if (timer === 0) {
        alert("Time is out");
      }
    };
  }, [timer]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    // console.log(selectedOption)
    const updatesAnswers = { ...answers, [questionId]: selectedOption };
    setAnswers(updatesAnswers);
  };

  const handleSubmit = () => {
    window.scrollTo({ top: 0, behaviour: "smooth" });
    setLoading(true);

    clearInterval(timerIntervalId);

    setTimeout(() => {
      const quizScore = calculateScore(answers);
      setScore(quizScore);
      const percentage = (quizScore / questions.length) * 100;
      const newStatus = percentage >= 50 ? "Passed" : "Failed";
      setStatus(newStatus);
      setshowResult(true);
      setLoading(false);
    }, 5000);
  };

  const calculateScore = (userAnswers) => {
    const correctAnswers = questions.map((question) => question.answer);
    let score = 0;
    for (const questionId in userAnswers) {
      if (userAnswers[questionId] === correctAnswers[questionId - 1]) {
        score++;
      }
    }
    return score;
  };

  //restart button
  const restartQuiz = () => {
    setAnswers({});
    setScore(0);
    setshowResult(false);
    setLoading(false);
    setTimer(60);
    navigate("/quiz");
  };

  return (
    <section>
      <QuizHeader timer={timer}/>
      <div className="md:w-9/12 w-[90%] mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start">
        <div className="md:w-[70%] w-full">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="m-3 py-3 px-4 shadow-md border border-gray-200 rounded "
            >
              <p className="flex items-center rounded text-xs p-2 cursor-pointer">
                <span className="h-8 w-8 bg-[#FCC822] rounded flex justify-center items-center black mr-3">
                  {index + 1}
                </span>
                <span className="">{question.question}</span>
              </p>
              {/* show options */}
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-5">
                {question.options.map((option, index) => (
                  <div
                    className={`border border-gray-200 rounded text-xs p-2 cursor-pointer ${
                      answers[question.id] === option ? "bg-gray-300" : ""
                    }`}
                    key={option}
                    onClick={() => handleAnswerSelect(question.id, option)}
                  >
                    <p className="text-[10px] mb-1">Option {index + 1}</p>
                    <p>{option}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            className="bg-primary px-6 py-2 text-white rounded "
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        </div>

        {/* show answers */}
        <div className="md:w-[30%] w-full p-4">
          {showResult && (
            <div>
              <h3 className="text-2xl font-medium">Your Score</h3>
              <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[30%] rounded-bl-[30%]">
                <h3
                  className={`text-xs ${
                    status === "Passed" ? "text-green-800" : "text-red-600"
                  }`}
                >
                  {status}
                </h3>
                <h1 className="text-3xl font-bold my-2">
                  {score * 10} <span className="text-slate-800">/200</span>
                </h1>
                <p>
                  Total Time: <span>
                    {formatTime(160-timer)}  <span>sec.</span>
                    </span></p>
              </div>
              <button
                onClick={restartQuiz}
                className="bg-primary px-6 py-2 text-white rounded mt-8 w-full"
              >
                Restart
              </button>
            </div>
          )}
        
        {loading && <Loading/>}
        </div>
      </div>
    </section>
  );
};

export default Quiz;
