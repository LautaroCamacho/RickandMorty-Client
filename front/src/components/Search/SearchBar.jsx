import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [id, setId] = useState("");

  const handleChange = (event) => {
    setId(event.target.value);
  };
  return (
    <div>
      <input type="search" onChange={handleChange} value={id} />
      <button
        type="button"
        class="btn btn-outline-danger"
        onClick={() => {
          onSearch(id);
        }}
      >
        Agregar
      </button>
    </div>
  );
};
export default SearchBar;
