import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const URL_BASE = "http://localhost:3001/rickandmorty/character";

const Detail = () => {
  const [character, setCharacter] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios(`${URL_BASE}/${id}`).then(({ data }) => {
      if (data.name) {
        setCharacter(data);
      } else {
        window.alert("No hay personajes con ese ID");
      }
    });
    return setCharacter({});
  }, [id]);

  return (
    <div className="card mb-3 m-4">
      <div className="row g-0">
        <div className="col-md-4 bg-black">
          <img
            src={character.image && character.image}
            alt="image"
            className="img-fluid rounded-pill m-5"
          ></img>
        </div>
        <div className="col-md-8 bg-light">
          <div className="card-body">
            <h5 className="card-title p-2">
              Name: {character.name} && {character.name}{" "}
            </h5>
            <h5 className="card-title p-2">
              Status: {character.status && character.status}
            </h5>
            <h5 className="card-title p-2">
              Species: {character.species && character.species}
            </h5>
            <h5 className="card-title p-2">
              Gender: {character.gender && character.gender}
            </h5>
            <h5 className="card-title p-2">
              Origin: {character.origin && character.origin?.name}
            </h5>
            <Link to="/home">
              <button className="btn btn-outline-danger">Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
