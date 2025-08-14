import { useState } from "react";

import Header from "./components/Header";
import Results from "./components/Results";
import UserInput from "./components/UserInput";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const userInputIsValid =
    userInput.duration >= 1 &&
    userInput.initialInvestment > 0 &&
    userInput.annualInvestment > 0 &&
    userInput.expectedReturn > 0;

  function handleUserInputChange(userInputID, value) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [userInputID]: +value,
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleUserInputChange} />
      {userInputIsValid && <Results userInput={userInput} />}
      {!userInputIsValid && (
        <p className="center">Please, enter valid input data</p>
      )}
    </>
  );
}

export default App;
