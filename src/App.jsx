import { useState } from "react";
import "./index.css";
import { languages } from "./languages";
import { getRandomWord } from "./utils";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import Header from "./components/Header";
import GameStatus from "./components/GameStatus";
import LanguageStatus from "./components/LanguageStatus";
import CurrentWordBar from "./components/CurrentWordBar";
import ScreenReader from "./components/ScreenReader";
import Keyboard from "./components/Keyboard";
import RestartButton from "./components/RestartButton";

export default function App() {
  // state values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // derived values
  const numGuessesLeft = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter(
    (word) => !currentWord.includes(word),
  ).length;
  const lastGuessedLetters = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetters && !currentWord.includes(lastGuessedLetters);

  const { width, height } = useWindowSize();

  const isGameWon = [...currentWord].every((letter) =>
    guessedLetters.includes(letter),
  );
  const isGameLost = wrongGuessCount >= numGuessesLeft ? true : false;
  const isGameOver = isGameLost || isGameWon;

  function guessLetter(letter) {
    setGuessedLetters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter],
    );
  }

  function resetGame() {
    setGuessedLetters([]);
    setCurrentWord(getRandomWord());
  }

  return (
    <main>
      <Header numGuessesLeft={numGuessesLeft} />

      <GameStatus
        isGameOver={isGameOver}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        isLastGuessIncorrect={isLastGuessIncorrect}
        wrongGuessCount={wrongGuessCount}
      />

      <LanguageStatus wrongGuessCount={wrongGuessCount} />

      <CurrentWordBar
        isGameOver={isGameOver}
        currentWord={currentWord}
        guessedLetters={guessedLetters}
      />

      <ScreenReader
        currentWord={currentWord}
        guessedLetters={guessedLetters}
        numGuessesLeft={numGuessesLeft}
        wrongGuessCount={wrongGuessCount}
        lastGuessedLetters={lastGuessedLetters}
        isLastGuessIncorrect={isLastGuessIncorrect}
      />

      <Keyboard
        guessLetter={guessLetter}
        isGameOver={isGameOver}
        guessedLetters={guessedLetters}
        currentWord={currentWord}
      />

      <RestartButton isGameOver={isGameOver} resetGame={resetGame} />

      {isGameWon && <ReactConfetti width={width} height={height} />}
    </main>
  );
}
