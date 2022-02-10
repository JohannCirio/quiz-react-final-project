import React from "react";

export default function Start(props: { beginNewGame: Function }) {
  return (
    <div className="intro-container">
      <h1>Quizzical</h1>
      <button onClick={() => props.beginNewGame()}>Start quiz</button>
    </div>
  );
}
