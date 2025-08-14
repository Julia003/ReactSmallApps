"use client";

import { useState } from "react";

export default function ClientDemo({ children }) {
  const [counter, setCounter] = useState(0);

  return (
    <div className="client-cmp">
      <h2>A React Client Component</h2>
      <p>
        Will be rendered on the client <strong>AND</strong> the server.
      </p>
      <p>
        <button
          onClick={() => {
            setCounter((prevCounter) => prevCounter + 1);
          }}
        >
          Increase
        </button>
        <span>{counter}</span>
      </p>
      {children}
    </div>
  );
}
