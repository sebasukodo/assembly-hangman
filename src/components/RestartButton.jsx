export default function RestartButton({ isGameOver, resetGame }) {
  const restartButton = isGameOver && (
    <button
      className="restart-button"
      aria-label="you have won, click this button to restart"
      onClick={resetGame}
    >
      New Game
    </button>
  );

  return restartButton;
}
