import Card from "../Card/Card";

const Cards = ({ characters, onClose }) => {
  return (
    <div className="container p-5">
      <div className="row">
        {characters.map(
          ({ id, name, species, gender, image, status, origin }) => {
            return (
              <div className="col-md-4">
                <Card
                  key={id}
                  id={id}
                  name={name}
                  species={species}
                  gender={gender}
                  image={image}
                  status={status}
                  origin={origin.name}
                  onClose={onClose}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
export default Cards;
