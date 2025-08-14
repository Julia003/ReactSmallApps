export default function GameOver({ winnerSymbol, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winnerSymbol ? <p>You won, {winnerSymbol}!</p> : <p>It's a draw!</p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
