import "./App.css";
import Card from "../components/Card/Card";
import Cards from "../components/Cards/Cards.jsx";
// import SearchBar from './components/SearchBar.jsx';
// import characters, { Rick } from "./data.js";
import Nav from "../components/Nav/Nav";
import { useState } from "react";
import axios from "axios";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import About from "../components/About/About.jsx";
import Detail from "../components/Detail/Detail.jsx";
import Form from "../components/Form/Form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Favorites from "../components/Favorites/Favorites.jsx";
import Error from "../components/Error/Error";

const URL_BASE = "http://localhost:3001/rickandmorty/character";
const example = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  gender: "Male",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

const App = () => {
  const [characters, setCharacters] = useState([]); //crear un estado local
  const { pathname } = useLocation(); //patname: `https://rickandmortyapi.com/api/character/${id}` todo lo que va por delante de la primer barrita es el patname

  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  async function login(userData) {
    try {
      const { email, password } = userData;
      const URL = "http://localhost:3001/rickandmorty/login/";
      const { data } = await axios(
        URL + `?email=${email}&password=${password}`
      );
      const { access } = data;
      setAccess(access);
      access && navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  const onClose = (id) => {
    // const parseId = parseInt(id, 10);
    setCharacters(
      characters.filter((char) => {
        return char.id !== Number(id);
      })
    );
  };

  async function onSearch(id) {
    const isDuplicate = characters.some(
      (character) => character.id === Number(id)
    );

    if (isDuplicate) {
      window.alert("El ID ya se encuentra renderizado en tu lista!");
      return;
    }
    try {
      const { data } = await axios(`${URL_BASE}/${id}`);
      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      }
    } catch (error) {
      alert("¡No hay personajes con este ID!");
    }
  }

  return (
    <div>
      {/* <SearchBar onSearch={(characterID) => window.alert(characterID)} /> */}
      {pathname !== "/" && <Nav onSearch={onSearch} characters={characters} />}

      {/* <Card
            id={Rick.id}
            name={Rick.name}
            status={Rick.status}
            species={Rick.species}
            gender={Rick.gender}
            origin={Rick.origin.name}
            image={Rick.image}
            onClose={() => window.alert('Emulamos que se cierra la card')}
         /> */}
      <Routes>
        <Route path="/" element={<Form login={login} />} />
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
