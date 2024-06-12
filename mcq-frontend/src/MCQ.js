import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const MCQ = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    axios
      .get("http://localhost:8000/quiz/questions/")
      .then((response) => {
        setQuestions(response.data);
        console.log("Questions fetched:", response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the questions!", error);
      });
  };

  const handleSpeech = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "ar-SA"; // Arabic language
    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      console.log("Speech result:", speechResult);
      setAnswer(speechResult);
      validateAnswer(speechResult);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
    };
  };

  const validateAnswer = (speechResult) => {
    const sanitizedAnswer = sanitizeText(speechResult);
    const currentQuestion = questions[currentQuestionIndex];
    const correctChoice = currentQuestion.choices.find(
      (choice) => sanitizeText(choice.text) === sanitizedAnswer
    );

    console.log(
      `Validating answer: ${sanitizedAnswer} for question ID: ${currentQuestion.id}`
    );

    if (correctChoice) {
      axios
        .post(`http://localhost:8000/quiz/validate/${currentQuestion.id}/`, {
          answer: sanitizedAnswer,
        })
        .then((response) => {
          const validationResult = response.data.result;
          console.log(`Validation result from backend: ${validationResult}`);
          setResult(validationResult);
        })
        .catch((error) => {
          console.error("There was an error validating the answer!", error);
        });
    } else {
      console.log("Answer not found in choices, setting result to incorrect.");
      setResult("incorrect");
    }
  };

  const sanitizeText = (text) => {
    return text.endsWith(".") ? text.slice(0, -1) : text;
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setAnswer(""); // Reset answer
    setResult(""); // Reset result
    console.log(
      "Moved to next question, current index:",
      currentQuestionIndex + 1
    );
  };
  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setAnswer(""); // Reset answer
    setResult(""); // Reset result
    console.log(
      "Moved to previous question, current index:",
      currentQuestionIndex - 1
    );
  };

  return (
    <div className="container">
      <h1>MCQ Test</h1>
      {questions.length > 0 && (
        <div className="question-container">
          <h2>{questions[currentQuestionIndex].text}</h2>
          <ul className="choices">
            {questions[currentQuestionIndex].choices.map((choice) => (
              <li key={choice.id}>{choice.text}</li>
            ))}
          </ul>
          <button onClick={handleSpeech}>Answer with Speech</button>
          <p>Your answer: {answer}</p>
          <p
            className={`result ${
              result === "correct" ? "correct" : "incorrect"
            }`}
          >
            {result}
          </p>
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button onClick={handlePreviousQuestion}>Previous</button>
            )}
            {currentQuestionIndex < questions.length - 1 && (
              <button
                onClick={handleNextQuestion}
                style={{ marginLeft: "10px" }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MCQ;
// I usually would create a Folder named "Components" and add all of my components but here we have only one component, so it is unnecessary
