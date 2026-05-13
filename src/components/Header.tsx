export default function Header({ numGuessesLeft }: { numGuessesLeft: number }) {
  return (
    <header>
      <h1>Assembly: Hangman</h1>
      <p>
        Guess the word in under {numGuessesLeft} attempts to keep the
        programming world safe from Assembly!
      </p>
    </header>
  );
}
