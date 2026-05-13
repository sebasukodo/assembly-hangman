export default function ScreenReader({
  lastGuessedLetters,
  isLastGuessIncorrect,
  numGuessesLeft,
  wrongGuessCount,
  currentWord,
  guessedLetters,
}) {
  return (
    <section className="sr-only" aria-live="polite" role="status">
      {/* screen-reader only section */}
      <p>
        {isLastGuessIncorrect
          ? `Incorrect, letter ${lastGuessedLetters} is not in the word.`
          : `Correct, letter ${lastGuessedLetters} is in the word.`}
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
