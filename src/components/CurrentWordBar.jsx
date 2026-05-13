export default function CurrentWordBar({
  isGameOver,
  currentWord,
  guessedLetters,
}) {
  const letterCurrentWord = isGameOver
    ? [...currentWord].map((x, index) => {
        return guessedLetters.includes(x) ? (
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
            {guessedLetters.includes(x) ? x.toUpperCase() : " "}
          </span>
        );
      });

  return (
    <section className="current-word-section">{letterCurrentWord}</section>
  );
}
