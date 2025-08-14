import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((prevIsEditing) => !prevIsEditing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameContent = isEditing ? (
    <input type="text" value={playerName} onChange={handleChange} required />
  ) : (
    <span className="player-name">{playerName}</span>
  );

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {playerNameContent}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
