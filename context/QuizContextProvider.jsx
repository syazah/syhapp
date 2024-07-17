import React, { createContext, useEffect, useState } from "react";

const QuizContext = createContext(null);
function QuizContextProvider({ children }) {
  const [currentRunningQuiz, setCurrentRunningQuiz] = useState(null);
  const optionArray = currentRunningQuiz
    ? new Array(currentRunningQuiz.questionLength).fill(null)
    : [];
  const [optionSelected, setOptionSelected] = useState(optionArray);
  const [scoreCalculated, setScoreCalculated] = useState(0);
  useEffect(() => {
    const newOptionArray = currentRunningQuiz
      ? new Array(currentRunningQuiz.questionLength).fill(null)
      : [];
    setOptionSelected(newOptionArray);
  }, [currentRunningQuiz]);
  return (
    <QuizContext.Provider
      value={{
        currentRunningQuiz,
        setCurrentRunningQuiz,
        optionSelected,
        setOptionSelected,
        scoreCalculated,
        setScoreCalculated,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizContext, QuizContextProvider };
