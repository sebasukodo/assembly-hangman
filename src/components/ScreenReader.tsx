type ScreenReaderProps = {
  lastGuessedLetter: string;
  isLastGuessIncorrect: boolean;
  numGuessesLeft: number;
  wrongGuessCount: number;
  currentWord: string;
  guessedLetters: string[];
};

export default function ScreenReader({
  lastGuessedLetter,
  isLastGuessIncorrect,
  numGuessesLeft,
  wrongGuessCount,
  currentWord,
  guessedLetters,
}: ScreenReaderProps) {
  return (
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
          .map((x) => (guessedLetters.includes(x) ? x + "." : "blank."))
          .join(" ")}
      </p>
    </section>
  );
}
