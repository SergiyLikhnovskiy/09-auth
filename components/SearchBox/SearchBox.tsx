import React, { useState } from "react";
import css from "./SearchBox.module.css";
interface SearchBoxProps {
  onChange: (value: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setInputValue(text);
    onChange(text);
  };

  return (
    <div>
      <input
        className={css.input}
        value={inputValue}
        onChange={handleChange}
        type="text"
        placeholder="Search notes"
      />
    </div>
  );
}
