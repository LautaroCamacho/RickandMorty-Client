import { Link, NavLink } from "react-router-dom";
import { addFav } from "../../redux/actions";
import { removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const Card = ({
  id,
  name,
  status,
  species,
  gender,
  origin,
  image,
  onClose,
  addFav,
  removeFav,
  myFavorites,
}) => {
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    if (isFav) {
      removeFav(id);
    } else {
      addFav({ id, name, status, species, gender, origin, image, onClose });
    }
    setIsFav(!isFav);
  };

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  return (
    <div class="col text-center p-2 card m-2 bg-dark">
      <div class="card-body">
        {isFav ? (
          <button
            type="button"
            class="btn btn-danger m-3"
            onClick={handleFavorite}
          >
            ❤️
          </button>
        ) : (
          <button
            type="button"
            class="btn btn-danger m-3"
            onClick={handleFavorite}
          >
            🤍
          </button>
        )}
        <button
          type="button"
          class="btn btn-danger m-3"
          onClick={() => {
            onClose(id);
          }}
        >
          Close
        </button>
        <NavLink to={`/detail/${id}`}>
          <h2 className="btn btn-outline-danger m-2 mt-3 mb-4 grid gap-2 text-center">
            Name: {name}
          </h2>
        </NavLink>
        <img
          src={image}
          className="img-fluid rounded-pill mr-1 p-3"
          alt={name}
        />
        <h2 class="m-2 mt-3 mb-4 d-grid gap-2 .text-nowrap h5">
          Status: {status}
        </h2>
        {/* <h2 class="m-2 mt-3 mb-4 d-grid gap-2 .text-nowrap h5">
          Species: {species}
        </h2> */}
        {/* <h2 class="m-2 mt-3 mb-4 d-grid gap-2 .text-nowrap h5">
          Gender: {gender}
        </h2> */}
        {/* <h2 class="m-2 mt-3 mb-4 d-grid gap-2 .text-nowrap h5">
          Origin: {origin}
        </h2> */}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => dispatch(addFav(character)), //character y id lo recibe por props
    removeFav: (id) => dispatch(removeFav(id)),
  };
};
const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
