import React, { useState } from "react";

const SearchT = ({ loadCountrie }) => {
  const [countrie, setCountrie] = useState("");
  console.log(countrie)

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loadCountrie(countrie);
    }
  };

  return (
    <div className="input">
      <img
        onClick={() => loadCountrie(countrie)}
        src="/images/lupa.png"
        alt="lupa"
      />
      <input
        type="text"
        onChange={(e) => setCountrie(e.target.value)} onKeyDown={handleKeyDown}
        placeholder="Search for a country..."
      />
    </div>
  );
};

export default SearchT;
