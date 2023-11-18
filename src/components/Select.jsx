import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

const Select = () => {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);
  const components = {
    DropdownIndicator: null,
  };
  const createOption = (label) => ({
    label,
    value: label, 
  });
  console.log(inputValue, value);

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
        break;
      default:
        break;
    }
  };
  // setSelectedTags(value);
  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => setValue(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="Type something and press enter..."
      value={value}
    />
  );
};

export default Select;
