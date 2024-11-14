import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";

import GuessInput from "../GuessInput/GuessInput";
import GuessList from "../GuessList/GuessList";

import WonBanner from "../WonBanner/WonBanner";
import LostBanner from "../LostBanner/LostBanner";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [gameStatus, setGameStatus] = React.useState("running");
  const [guessList, setGuessList] = React.useState([]);

  const handleGuess = (guess) => {
    const newGuesses = [...guessList, guess];
    setGuessList(newGuesses);

    if (guess === answer) {
      setGameStatus("won");
    } else if (newGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
    }
  };

  return (
    <>
      {gameStatus}
      <GuessList guessList={guessList} answer={answer} />
      <GuessInput handleGuess={handleGuess} gameStatus={gameStatus} />
      {gameStatus === "won" && <WonBanner numOfGuesses={guessList.length} />}
      {gameStatus === "lost" && <LostBanner answer={answer} />}
    </>
  );
}

export default Game;
