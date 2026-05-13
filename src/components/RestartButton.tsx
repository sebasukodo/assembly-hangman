type RestartButtonProps = {
  isGameOver: boolean;
  resetGame: () => void;
};

export default function RestartButton({
  isGameOver,
  resetGame,
}: RestartButtonProps) {
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
