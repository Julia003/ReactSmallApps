import { useState, useRef } from "react";

export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const searchedResult = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  function handleChange(event) {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 750);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchedResult.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
