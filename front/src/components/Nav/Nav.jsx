import SearchBar from "../Search/SearchBar";
import { Link, NavLink } from "react-router-dom";

const Nav = ({ onSearch, characters }) => {
  const generateRandom = () => {
    let randomID = Math.floor(Math.random() * 826) + 1;
    const characterExist = characters.some(
      (character) => character.id === randomID
    );
    if (characterExist) {
      return generateRandom();
    }

    return randomID;
  };

  const randomize = () => {
    let randomID = generateRandom();
    onSearch(randomID);
  };

  return (
    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container-fluid">
        <SearchBar onSearch={onSearch} />
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={randomize}
        >
          Random
        </button>

        <NavLink to="/about">
          <button type="button" class="btn btn-outline-primary">
            About
          </button>
        </NavLink>
        <NavLink to="/home">
          <button type="button" class="btn btn-outline-primary">
            Home
          </button>
        </NavLink>
        <NavLink to="/favorites">
          <button type="button" class="btn btn-outline-primary">
            Favorites!
          </button>
        </NavLink>

        <NavLink to="/">
          <button type="button" class="btn btn-outline-primary">
            Log out!
          </button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
