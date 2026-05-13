import clsx from "clsx";

export default function Keyboard({
  guessLetter,
  isGameOver,
  guessedLetters,
  currentWord,
}) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const letterButtons = [...alphabet].map((x) => {
    return (
      <button
        onClick={() => guessLetter(x)}
        aria-label={`letter ${x}`}
        key={`letter-${x}`}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(x)}
        className={
          guessedLetters.includes(x)
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

  return <section className="keyboard-section">{letterButtons}</section>;
}
