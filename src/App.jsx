import { useState } from "react";
import "./index.css";
import { languages } from "./languages";
import { clsx } from "clsx";
import { getFarewellText, getRandomWord } from "./utils";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function App() {
  // state values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetter, setGuessedLetter] = useState([]);

  // derived values
  const numGuessesLeft = languages.length - 1;
  const wrongGuessCount = guessedLetter.filter(
    (word) => !currentWord.includes(word),
  ).length;
  const lastGuessedLetter = guessedLetter[guessedLetter.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const { width, height } = useWindowSize();

  const isGameWon = [...currentWord].every((letter) =>
    guessedLetter.includes(letter),
  );
  const isGameLost = wrongGuessCount >= numGuessesLeft ? true : false;
  const isGameOver = isGameLost || isGameWon;

  // static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const allLanguages = languages.map((x, index) => (
    <span
      id={x.name}
      key={x.name}
      className={index >= wrongGuessCount ? undefined : "lost"}
      style={{ backgroundColor: x.backgroundColor, color: x.color }}
    >
      {x.name}
    </span>
  ));

  const letterCurrentWord = isGameOver
    ? [...currentWord].map((x, index) => {
        return guessedLetter.includes(x) ? (
          <span key={`${currentWord}-span-${index}`} className="correct">
            {x.toUpperCase()}
          </span>
        ) : (
          <span key={`${currentWord}-span-${index}`} className="missing">
            {x.toUpperCase()}
          </span>
        );
      })
    : [...currentWord].map((x, index) => {
        return (
          <span key={`${currentWord}-span-${index}`}>
            {guessedLetter.includes(x) ? x.toUpperCase() : " "}
          </span>
        );
      });

  const letterButtons = [...alphabet].map((x) => {
    return (
      <button
        onClick={() => guessLetter(x)}
        aria-label={`letter ${x}`}
        key={`letter-${x}`}
        disabled={isGameOver}
        aria-disabled={guessedLetter.includes(x)}
        className={
          guessedLetter.includes(x)
            ? clsx({
                correct: currentWord.includes(x),
                incorrect: !currentWord.includes(x),
              })
            : undefined
        }
      >
        {x.toUpperCase()}
      </button>
    );
  });

  function guessLetter(letter) {
    setGuessedLetter((prev) =>
      prev.includes(letter) ? prev : [...prev, letter],
    );
  }

  function resetGame() {
    setGuessedLetter([]);
    setCurrentWord(getRandomWord());
  }

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <>
          <h2>{getFarewellText(languages[wrongGuessCount - 1].name)}</h2>
        </>
      );
    }
    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
    return null;
  }

  return (
    <main>
      <header>
        <h1>Assembly: Hangman</h1>
        <p>
          Guess the word in under {numGuessesLeft} attempts to keep the
          programming world safe from Assembly!
        </p>
      </header>
      <section
        aria-live="polite"
        role="status"
        className={clsx(
          "status-section",
          isGameWon && "win",
          isGameLost && "lose",
          isLastGuessIncorrect && !isGameOver && "farewell",
        )}
      >
        {renderGameStatus()}
      </section>
      <section className="language-section">{allLanguages}</section>
      <section className="current-word-section">{letterCurrentWord}</section>
      <section className="sr-only" aria-live="polite" role="status">
        {/* screen-reader only section */}
        <p>
          {isLastGuessIncorrect
            ? `Incorrect, letter ${lastGuessedLetter} is not in the word.`
            : `Correct, letter ${lastGuessedLetter} is in the word.`}
          {`You have ${numGuessesLeft - wrongGuessCount} attempts left.`}
        </p>
        <p>
          Current word:{" "}
          {[...currentWord]
            .map((x) => (guessedLetter.includes(x) ? x + "." : "blank."))
            .join(" ")}
        </p>
      </section>
      <section className="keyboard-section">{letterButtons}</section>
      {isGameOver && (
        <button
          className="restart-button"
          aria-label="you have won, click this button to restart"
          onClick={resetGame}
        >
          New Game
        </button>
      )}
      {isGameWon && <ReactConfetti width={width} height={height} />}
    </main>
  );
}
