import clsx from "clsx";
import { languages } from "../languages";
import { getFarewellText } from "../utils";

type GameStatusProps = {
  isGameOver: boolean;
  isGameWon: boolean;
  isGameLost: boolean;
  isLastGuessIncorrect: boolean;
  wrongGuessCount: number;
};

export default function GameStatus({
  isGameOver,
  isGameWon,
  isGameLost,
  isLastGuessIncorrect,
  wrongGuessCount,
}: GameStatusProps) {
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
  );
}
